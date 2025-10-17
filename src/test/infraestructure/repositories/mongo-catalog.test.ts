// src/test/infraestructure/repositories/mongo-catalog.test.ts

import { MongoCatalogRepository } from '../../../infraestructure/repositories/mongo-catalog';
import { Catalog } from '../../../domain/entities/Catalog';

// Mock the database models
jest.mock('../../../infraestructure/database/inventory-mongo', () => ({
    InventoryModel: {
        countDocuments: jest.fn(),
        find: jest.fn().mockReturnValue({
            populate: jest.fn().mockReturnValue({
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockReturnValue({
                        exec: jest.fn()
                    })
                })
            })
        })
    }
}));

describe('MongoCatalogRepository', () => {
    let repository: MongoCatalogRepository;
    let mockInventoryModel: any;

    beforeEach(() => {
        repository = new MongoCatalogRepository();
        mockInventoryModel = require('../../../infraestructure/database/inventory-mongo').InventoryModel;
        jest.clearAllMocks();
    });

    describe('getCatalog', () => {
        it('should return catalog with pagination', async () => {
            const mockInventoryData = [
                {
                    stock: 10,
                    price: 100,
                    reservedStock: 2,
                    productId: {
                        _id: 'product1',
                        name: 'Test Product',
                        description: 'Test Description',
                        categoryId: {
                            _id: 'cat1',
                            name: 'Test Category'
                        },
                        isDiscontinued: false,
                        images: ['image1.jpg', 'image2.jpg']
                    }
                }
            ];

            mockInventoryModel.countDocuments.mockResolvedValue(1);
            mockInventoryModel.find().populate().skip().limit().exec.mockResolvedValue(mockInventoryData);

            const result = await repository.getCatalog(1, 10);

            expect(result).toEqual({
                catalogs: expect.arrayContaining([
                    expect.objectContaining({
                        id: 'product1',
                        name: 'Test Product',
                        description: 'Test Description',
                        categoryId: 'cat1',
                        categoryName: 'Test Category',
                        isDiscontinued: false,
                        stock: 10,
                        price: 100,
                        reservedStock: 2,
                        images: ['image1.jpg', 'image2.jpg']
                    })
                ]),
                total: 1,
                totalPages: 1,
                page: 1,
                limit: 10
            });

            expect(mockInventoryModel.countDocuments).toHaveBeenCalledWith({ stock: { $gt: 0 } });
            expect(mockInventoryModel.find).toHaveBeenCalledWith({ stock: { $gt: 0 } });
        });

        it('should handle empty catalog', async () => {
            mockInventoryModel.countDocuments.mockResolvedValue(0);
            mockInventoryModel.find().populate().skip().limit().exec.mockResolvedValue([]);

            const result = await repository.getCatalog(1, 10);

            expect(result).toEqual({
                catalogs: [],
                total: 0,
                totalPages: 0,
                page: 1,
                limit: 10
            });
        });

        it('should handle pagination correctly', async () => {
            mockInventoryModel.countDocuments.mockResolvedValue(25);
            mockInventoryModel.find().populate().skip().limit().exec.mockResolvedValue([]);

            const result = await repository.getCatalog(2, 10);

            expect(result.totalPages).toBe(3);
            expect(result.page).toBe(2);
            expect(result.limit).toBe(10);
        });

        it('should handle products without category', async () => {
            const mockInventoryData = [
                {
                    stock: 5,
                    price: 50,
                    reservedStock: 0,
                    productId: {
                        _id: 'product2',
                        name: 'Product Without Category',
                        description: 'No category',
                        categoryId: null,
                        isDiscontinued: false,
                        images: []
                    }
                }
            ];

            mockInventoryModel.countDocuments.mockResolvedValue(1);
            mockInventoryModel.find().populate().skip().limit().exec.mockResolvedValue(mockInventoryData);

            const result = await repository.getCatalog(1, 10);

            expect(result.catalogs[0]).toEqual(
                expect.objectContaining({
                    id: 'product2',
                    name: 'Product Without Category',
                    categoryId: null,
                    categoryName: null,
                    images: []
                })
            );
        });
    });
});
