import { Categories } from "@prisma/client";
import db from "../lib/prisma";
import { PaginatedResult } from "../types/pagination";
import { ApiError } from "../errors/ApiError";

export async function createCategory(data: {
  title: string;
  slug: string;
}): Promise<Categories> {
  const exists = await db.categories.findUnique({ where: { slug: data.slug } });
  if (exists) {
    throw new ApiError("Categoria já existe", 409);
  }
  return db.categories.create({ data });
}

export async function editCategory(
  id: string,
  data: {
    title?: string;
    slug?: string;
  },
): Promise<Categories> {
  const category = await db.categories.findUnique({ where: { id } });
  if (!category) {
    throw new ApiError("Categoria não encontrada", 404);
  }
  if (data.slug) {
    const slugExists = await db.categories.findFirst({
      where: { slug: data.slug, NOT: { id } },
    });
    if (slugExists) {
      throw new ApiError("Slug já está em uso", 409);
    }
  }
  return db.categories.update({ where: { id }, data });
}

export async function findCategoryById(id: string): Promise<Categories | null> {
  return db.categories.findUnique({ where: { id } });
}

export async function removeCategory(id: string): Promise<void> {
  const category = await db.categories.findUnique({ where: { id } });
  if (!category) {
    throw new ApiError("Categoria não encontrada", 404);
  }
  const hasArticles = await db.articles.count({
    where: { categoryId: id },
  });
  if (hasArticles > 0) {
    throw new ApiError(
      "Não é possível remover: existem artigos vinculados a esta categoria.",
      409,
    );
  }
  await db.categories.delete({ where: { id } });
}

export async function getAllCategories(
  page = 1,
  pageSize = 10,
): Promise<PaginatedResult<Categories>> {
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    db.categories.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "asc" },
    }),
    db.categories.count(),
  ]);
  return {
    items,
    total,
    page,
    pageSize,
  };
}
