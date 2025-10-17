// src/test/infraestructure/repositories/mongo-preorden.test.ts

import { MongoPreorderRepository } from '../../../infraestructure/repositories/mongo-preorden';
import { Preorder } from '../../../domain/entities/Preorder';
import { IPreorder } from '../../../domain/models/interfaces/IPreorder';
import { PreOrderStatus } from '../../../application/dtos/preorder-dtos';

// Mock the database model
jest.mock('../../../infraestructure/database/preorden-mongo', () => ({
    PreorderModel: {
        create: jest.fn(),
        findById: jest.fn(),
        findByIdAndUpdate: jest.fn()
    }
}));

describe('MongoPreorderRepository', () => {
    let repository: MongoPreorderRepository;
    let mockPreorderModel: any;

    beforeEach(() => {
        repository = new MongoPreorderRepository();
        mockPreorderModel = require('../../../infraestructure/database/preorden-mongo').PreorderModel;
        jest.clearAllMocks();
    });

    const createMockPreorderData = (): IPreorder => ({
        _id: 'preorder1',
        userId: 'user1',
        products: [],
        shippingAddress: {
            country: 'Colombia',
            state: 'Cundinamarca',
            city: 'Bogotá',
            neighborhood: 'Centro',
            address: 'Calle 123 #45-67',
            postalCode: '110111'
        },
        paymentMethod: 'credit_card',
        shippingCost: 10.00,
        total: 100.00,
        status: PreOrderStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date()
    });

    describe('save', () => {
        it('should save a new preorder successfully', async () => {
            const preorderData = createMockPreorderData();
            const preorder = new Preorder(preorderData);
            const mockCreatedPreorder = {
                _id: 'preorder1',
                ...preorderData,
                toObject: jest.fn().mockReturnValue({
                    _id: 'preorder1',
                    ...preorderData
                })
            };

            mockPreorderModel.create.mockResolvedValue(mockCreatedPreorder);

            const result = await repository.save(preorder);

            expect(mockPreorderModel.create).toHaveBeenCalledWith(preorder);
            expect(result).toBeInstanceOf(Preorder);
            expect(result._id).toBe('preorder1');
        });

        it('should handle save error', async () => {
            const preorderData = createMockPreorderData();
            const preorder = new Preorder(preorderData);
            const error = new Error('Database error');
            mockPreorderModel.create.mockRejectedValue(error);

            await expect(repository.save(preorder)).rejects.toThrow('Database error');
        });
    });

    describe('findById', () => {
        it('should find preorder by id successfully', async () => {
            const preorderData = createMockPreorderData();
            const mockPreorderDoc = {
                _id: 'preorder1',
                ...preorderData,
                toObject: jest.fn().mockReturnValue({
                    _id: 'preorder1',
                    ...preorderData
                })
            };

            mockPreorderModel.findById.mockResolvedValue(mockPreorderDoc);

            const result = await repository.findById('preorder1');

            expect(mockPreorderModel.findById).toHaveBeenCalledWith('preorder1');
            expect(result).toBeInstanceOf(Preorder);
            expect(result?._id).toBe('preorder1');
        });

        it('should return null when preorder not found', async () => {
            mockPreorderModel.findById.mockResolvedValue(null);

            const result = await repository.findById('nonexistent');

            expect(result).toBeNull();
        });

        it('should handle findById error', async () => {
            const error = new Error('Database error');
            mockPreorderModel.findById.mockRejectedValue(error);

            await expect(repository.findById('preorder1')).rejects.toThrow('Database error');
        });
    });

    describe('update', () => {
        it('should update preorder successfully', async () => {
            const preorderData = createMockPreorderData();
            preorderData.status = PreOrderStatus.CONFIRMED;
            const preorder = new Preorder(preorderData);
            const mockUpdatedPreorder = {
                _id: 'preorder1',
                ...preorderData,
                toObject: jest.fn().mockReturnValue({
                    _id: 'preorder1',
                    ...preorderData
                })
            };

            mockPreorderModel.findByIdAndUpdate.mockResolvedValue(mockUpdatedPreorder);

            const result = await repository.update('preorder1', preorder);

            expect(mockPreorderModel.findByIdAndUpdate).toHaveBeenCalledWith(
                'preorder1',
                { ...preorder, updatedAt: expect.any(Date) },
                { new: true }
            );
            expect(result).toBeInstanceOf(Preorder);
            expect(result?._id).toBe('preorder1');
        });

        it('should return null when preorder not found for update', async () => {
            const preorderData = createMockPreorderData();
            const preorder = new Preorder(preorderData);
            mockPreorderModel.findByIdAndUpdate.mockResolvedValue(null);

            const result = await repository.update('nonexistent', preorder);

            expect(result).toBeNull();
        });

        it('should handle update error', async () => {
            const preorderData = createMockPreorderData();
            const preorder = new Preorder(preorderData);
            const error = new Error('Database error');
            mockPreorderModel.findByIdAndUpdate.mockRejectedValue(error);

            await expect(repository.update('preorder1', preorder)).rejects.toThrow('Database error');
        });
    });
});