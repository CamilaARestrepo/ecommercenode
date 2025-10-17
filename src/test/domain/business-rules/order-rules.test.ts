import { generateOrderNumber, validateOrderData } from '../../../domain/business-rules/order-rules';
import { IOrderRepository } from '../../../domain/repositories/IOrder-repository';

describe('Order Business Rules', () => {
    let mockOrderRepo: jest.Mocked<IOrderRepository>;

    beforeEach(() => {
        jest.clearAllMocks();
        mockOrderRepo = {
            findByOrderNumber: jest.fn(),
            save: jest.fn(),
            findById: jest.fn(),
            findByPreorderId: jest.fn(),
            findByUserId: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findAll: jest.fn()
        } as any;
    });

    describe('generateOrderNumber', () => {
        it('should generate unique order number', async () => {
            mockOrderRepo.findByOrderNumber.mockResolvedValue(null);

            const orderNumber = await generateOrderNumber(mockOrderRepo);

            expect(orderNumber).toMatch(/^ORD-\d{8}-[A-Z0-9]{5}$/);
            expect(mockOrderRepo.findByOrderNumber).toHaveBeenCalledWith(orderNumber);
        });

        it('should retry when order number already exists', async () => {
            mockOrderRepo.findByOrderNumber
                .mockResolvedValueOnce({ orderNumber: 'ORD-20241201-ABC12' } as any)
                .mockResolvedValueOnce(null);

            const orderNumber = await generateOrderNumber(mockOrderRepo);

            expect(orderNumber).toMatch(/^ORD-\d{8}-[A-Z0-9]{5}$/);
            expect(mockOrderRepo.findByOrderNumber).toHaveBeenCalledTimes(2);
        });

        it('should throw error after maximum attempts', async () => {
            mockOrderRepo.findByOrderNumber.mockResolvedValue({ orderNumber: 'existing' } as any);

            await expect(generateOrderNumber(mockOrderRepo))
                .rejects.toThrow('Unable to generate unique order number after maximum attempts');
        });
    });

    describe('validateOrderData', () => {
        const validOrderData = {
            preorderId: 'pre-123',
            userId: 'user-456',
            products: [
                { productId: 'prod-1', quantity: 2, price: 50 }
            ],
            shippingAddress: {
                country: 'Colombia',
                state: 'Antioquia',
                city: 'Medellin',
                neighborhood: 'Poblado',
                address: 'Calle 123',
                postalCode: '050001'
            },
            paymentMethod: 'credit_card',
            total: 100
        };

        it('should validate correct order data', () => {
            expect(() => validateOrderData(validOrderData)).not.toThrow();
        });

        it('should throw error when preorderId is missing', () => {
            const invalidData = { ...validOrderData, preorderId: undefined };
            expect(() => validateOrderData(invalidData)).toThrow('Preorder ID is required');
        });

        it('should throw error when userId is missing', () => {
            const invalidData = { ...validOrderData, userId: undefined };
            expect(() => validateOrderData(invalidData)).toThrow('User ID is required');
        });

        it('should throw error when products array is empty', () => {
            const invalidData = { ...validOrderData, products: [] };
            expect(() => validateOrderData(invalidData)).toThrow('Order must contain at least one product');
        });

        it('should throw error when products is not an array', () => {
            const invalidData = { ...validOrderData, products: null };
            expect(() => validateOrderData(invalidData)).toThrow('Order must contain at least one product');
        });

        it('should throw error when shippingAddress is missing', () => {
            const invalidData = { ...validOrderData, shippingAddress: undefined };
            expect(() => validateOrderData(invalidData)).toThrow('Shipping address is required');
        });

        it('should throw error when paymentMethod is missing', () => {
            const invalidData = { ...validOrderData, paymentMethod: undefined };
            expect(() => validateOrderData(invalidData)).toThrow('Payment method is required');
        });

        it('should throw error when total is zero or negative', () => {
            const invalidData1 = { ...validOrderData, total: 0 };
            const invalidData2 = { ...validOrderData, total: -100 };
            
            expect(() => validateOrderData(invalidData1)).toThrow('Order total must be greater than zero');
            expect(() => validateOrderData(invalidData2)).toThrow('Order total must be greater than zero');
        });
    });
});