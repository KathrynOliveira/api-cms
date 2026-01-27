import { Categories } from "@prisma/client";
import db from "../lib/prisma";
import { PaginatedResult } from "../types/pagination";

export async function createCategory(data: {
  title: string;
  slug: string;
}): Promise<Categories> {
  return db.categories.create({ data });
}

export async function editCategory(
  id: string,
  data: { title?: string; slug?: string },
): Promise<Categories> {
  return db.categories.update({ where: { id }, data });
}

export async function removeCategory(id: string): Promise<void> {
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

export async function findCategoryById(id: string): Promise<Categories | null> {
  return db.categories.findUnique({ where: { id } });
}
