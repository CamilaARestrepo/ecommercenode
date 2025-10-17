import { ICatalogRepository } from "../repositories/ICatalog-repository";
import { Catalog } from "../entities/Catalog";

export const findCatalog = async (catalogRepo: ICatalogRepository, page?: number, limit?: number): Promise<{
    catalogs: Catalog[],
    total: number,
    totalPages: number,
    page: number,
    limit: number
}> => {
    try{
        return await catalogRepo.getCatalog(page, limit);
    }catch(error){
        throw new Error(`[ERROR TO SERVICE] Error retrieving catalog: ${error}`);
    }
}