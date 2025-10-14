import { Inventory } from "../entities/Inventory";

export interface IInventoryRepository {

    update(id: string, data: Partial<Inventory>): Promise<Inventory>;
    updateReservedStock(id: string, data: Partial<Inventory>): Promise<Inventory>;
    getInventoryById(id: string): Promise <Inventory>;
}
