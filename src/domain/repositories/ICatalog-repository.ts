import { Catalog } from "../entities/Catalog";

export interface ICatalogRepository {
    getCatalog(): Promise <Catalog[]>
}