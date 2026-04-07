import { ICatalogRepository } from "../repositories/ICatalog-repository";
import { Catalog } from "../entities/Catalog";

export const findCatalog = async (
  catalogRepo: ICatalogRepository
): Promise<Catalog[]> => {
  try {
    const response = await catalogRepo.getCatalog();
    return response.catalogs; // 🔥 AQUÍ ESTÁ LA CLAVE
  } catch (error) {
    throw new Error(`[ERROR TO SERVICE] Error retrieving catalog: ${error}`);
  }
};