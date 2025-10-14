import { InventoryModel } from "../database/inventory-mongo";
import { ICatalogRepository } from "../../domain/repositories/ICatalog-repository";
import { Catalog } from "../../domain/entities/Catalog";

export class MongoCatalogRepository implements ICatalogRepository {
  async getCatalog(): Promise<Catalog[]> {
    const activeInventories = await InventoryModel.find({ stock: { $gt: 0 } })
      .populate({
        path: "productId",
        select: "name description categoryId isDiscontinued images",
        populate: {
          path: "categoryId",
          select: "name",
        },
      })
      .exec();
      console.log(activeInventories)
    const catalogs: Catalog[] = activeInventories.map((item) => {
      const product: any = item.productId;

      return new Catalog({
        id: product._id.toString(),
        name: product.name,
        description: product.description,
        categoryId: product.categoryId?._id?.toString() || null,
        categoryName: product.categoryId?.name || null,
        isDiscontinued: product.isDiscontinued,
        stock: item.stock,
        price: item.price,
        reservedStock: item.reservedStock,
        images: Array.isArray(product.images) ? product.images : [],
      });
    });
    console.log (Catalog)

    return catalogs;
  }
}
