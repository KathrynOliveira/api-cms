import { Articles } from "@prisma/client";
import db from "../lib/prisma";
import { PaginatedResult } from "../types/pagination";
import { ApiError } from "../errors/ApiError";
import slugify from "slugify";

export async function getAllArticles(
  page = 1,
  pageSize = 10,
): Promise<PaginatedResult<Articles>> {
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    db.articles.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "asc" },
    }),
    db.articles.count(),
  ]);
  return {
    items,
    total,
    page,
    pageSize,
  };
}

export async function createArticle(data: {
  body: string;
  title: string;
  categoryId: string;
  userId: string;
}): Promise<Articles> {
  // Geração de slug
  let slug = slugify(data.title, {
    lower: true,
    strict: true,
  });

  // Verifica unicidade do slug
  const exists = await db.articles.findUnique({ where: { slug } });
  if (exists) {
    throw new ApiError("Artigo já existe", 409);
  }

  // Verifica existência da categoria
  const category = await db.categories.findUnique({
    where: { id: data.categoryId },
  });

  if (!category) {
    throw new ApiError("Categoria não encontrada", 404);
  }

  // Verifica existência do usuário
  const user = await db.user.findUnique({ where: { id: data.userId } });
  if (!user) {
    throw new ApiError("Usuário não encontrado", 404);
  }

  return db.articles.create({
    data: { ...data, slug },
  });
}

export async function editArticle(
  id: string,
  data: {
    title?: string;
    body?: string;
    categoryId?: string;
  },
  currentUser: { id: string; role: string },
): Promise<Articles> {
  const article = await db.articles.findUnique({ where: { id } });
  if (!article) {
    throw new ApiError("Artigo não encontrado", 404);
  }
  // Permissão: admin ou autor do artigo
  if (currentUser.role !== "ADMIN" && currentUser.id !== article.userId) {
    throw new ApiError("Você não tem permissão para editar este artigo", 403);
  }

  // Se for atualizar o título, gere novo slug e verifique unicidade
  let updateData: any = { ...data };
  if (data.title) {
    const slug = slugify(data.title, { lower: true, strict: true });
    const slugExists = await db.articles.findFirst({
      where: { slug, NOT: { id } },
    });
    if (slugExists) {
      throw new ApiError("Slug já está em uso", 409);
    }
    updateData.slug = slug;
  }

  // Se for atualizar categoria, verifique existência
  if (data.categoryId) {
    const category = await db.categories.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) {
      throw new ApiError("Categoria não encontrada", 404);
    }
  }

  return db.articles.update({ where: { id }, data: updateData });
}

export async function removeArticle(id: string): Promise<void> {
  const article = await db.articles.findUnique({ where: { id } });
  if (!article) {
    throw new ApiError("Artigo não encontrado", 404);
  }
  await db.articles.delete({ where: { id } });
}

export async function findArticleById(id: string): Promise<Articles | null> {
  return db.articles.findUnique({ where: { id } });
}

export async function findArticleByCategoryId(
  categoryId: string,
): Promise<Articles | null> {
  return db.articles.findFirst({ where: { categoryId } });
}

export async function getArticlesByCategory(
  categoryId: string,
): Promise<Articles[]> {
  const category = await findArticleByCategoryId(categoryId);

  if (!category) {
    throw new ApiError("Categoria não encontrada", 404);
  }

  const articles = await db.articles.findMany({ where: { categoryId } });
  return articles;
}
