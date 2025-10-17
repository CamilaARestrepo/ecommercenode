import { Inventory } from '../../../domain/entities/Inventory';
import { IInventory } from '../../../domain/models/interfaces/IInventory';

describe('Inventory Entity', () => {
    describe('Given complete inventory data', () => {
        it('should create inventory with all properties correctly assigned', () => {
            const inventoryData: IInventory & { id?: string } = {
                id: 'inv-123',
                productId: 'prod-456',
                price: 150000,
                stock: 25,
                reservedStock: 5,
                reservations: [] as any,
                action: 1
            };
            
            // Manually assign reservations to test the functionality
            (inventoryData as any).reservations = [
                { userId: 'user1', quantity: 3, createdAt: new Date() },
                { userId: 'user2', quantity: 2, createdAt: new Date() }
            ];

            const inventory = new Inventory(inventoryData);

            expect(inventory.id).toBe('inv-123');
            expect(inventory.productId).toBe('prod-456');
            expect(inventory.price).toBe(150000);
            expect(inventory.stock).toBe(25);
            expect(inventory.reservedStock).toBe(5);
            expect((inventory as any).reservations).toHaveLength(2);
            expect(inventory.action).toBe(1);
        });

        it('should be an instance of Inventory class', () => {
            const inventoryData: IInventory = {
                productId: 'prod-1',
                price: 100000,
                stock: 10,
                reservedStock: 2,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory).toBeInstanceOf(Inventory);
        });
    });

    describe('Given minimal inventory data', () => {
        it('should create inventory with default values', () => {
            const minimalData: IInventory = {
                productId: 'prod-minimal',
                price: 50000
            };

            const inventory = new Inventory(minimalData);

            expect(inventory.productId).toBe('prod-minimal');
            expect(inventory.price).toBe(50000);
            expect(inventory.stock).toBe(0);
            expect(inventory.reservedStock).toBe(0);
            expect((inventory as any).reservations).toEqual([]);
            expect(inventory.id).toBe('');
            expect(inventory.action).toBeUndefined();
        });
    });

    describe('Given inventory without optional fields', () => {
        it('should set default values for optional fields', () => {
            const inventoryData: IInventory = {
                productId: 'prod-basic',
                price: 75000
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.stock).toBe(0);
            expect(inventory.reservedStock).toBe(0);
            expect((inventory as any).reservations).toEqual([]);
        });
    });

    describe('Given inventory with reservations', () => {
        it('should handle multiple reservations', () => {
            const reservations = [
                { userId: 'user1', quantity: 2, createdAt: new Date('2024-01-01') },
                { userId: 'user2', quantity: 3, createdAt: new Date('2024-01-02') },
                { userId: 'user3', quantity: 1, createdAt: new Date('2024-01-03') }
            ];

            const inventoryData: IInventory = {
                productId: 'prod-reserved',
                price: 200000,
                stock: 20,
                reservedStock: 6,
                reservations: [] as any
            };
            
            // Manually assign reservations to test the functionality
            (inventoryData as any).reservations = reservations;

            const inventory = new Inventory(inventoryData);

            expect((inventory as any).reservations).toHaveLength(3);
            expect((inventory as any).reservations[0].userId).toBe('user1');
            expect((inventory as any).reservations[1].quantity).toBe(3);
            expect(inventory.reservedStock).toBe(6);
        });

        it('should handle empty reservations array', () => {
            const inventoryData: IInventory = {
                productId: 'prod-no-reservations',
                price: 80000,
                stock: 15,
                reservedStock: 0,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect((inventory as any).reservations).toEqual([]);
            expect(inventory.reservedStock).toBe(0);
        });
    });

    describe('Given inventory with different stock levels', () => {
        it('should handle high stock inventory', () => {
            const inventoryData: IInventory = {
                productId: 'prod-high-stock',
                price: 25000,
                stock: 1000,
                reservedStock: 50,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.stock).toBe(1000);
            expect(inventory.reservedStock).toBe(50);
        });

        it('should handle zero stock inventory', () => {
            const inventoryData: IInventory = {
                productId: 'prod-out-of-stock',
                price: 120000,
                stock: 0,
                reservedStock: 0,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.stock).toBe(0);
            expect(inventory.reservedStock).toBe(0);
        });

        it('should handle inventory where reserved equals total stock', () => {
            const inventoryData: IInventory = {
                productId: 'prod-fully-reserved',
                price: 300000,
                stock: 10,
                reservedStock: 10,
                reservations: [] as any
            };

            // Manually assign reservations to test the functionality
            (inventoryData as any).reservations = [
                { userId: 'user1', quantity: 10, createdAt: new Date() }
            ];
            
            const inventory = new Inventory(inventoryData);

            expect(inventory.stock).toBe(10);
            expect(inventory.reservedStock).toBe(10);
            expect((inventory as any).reservations).toHaveLength(1);
        });
    });

    describe('Given inventory with different actions', () => {
        it('should handle action type 1 (add)', () => {
            const inventoryData: IInventory = {
                productId: 'prod-action-add',
                price: 90000,
                stock: 15,
                reservedStock: 3,
                reservations: [],
                action: 1
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.action).toBe(1);
        });

        it('should handle action type 2 (subtract)', () => {
            const inventoryData: IInventory = {
                productId: 'prod-action-subtract',
                price: 110000,
                stock: 8,
                reservedStock: 2,
                reservations: [],
                action: 2
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.action).toBe(2);
        });
    });

    describe('Given inventory with price variations', () => {
        it('should handle high-value inventory', () => {
            const inventoryData: IInventory = {
                productId: 'prod-expensive',
                price: 5000000,
                stock: 2,
                reservedStock: 1,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.price).toBe(5000000);
        });

        it('should handle low-value inventory', () => {
            const inventoryData: IInventory = {
                productId: 'prod-cheap',
                price: 1000,
                stock: 100,
                reservedStock: 10,
                reservations: []
            };

            const inventory = new Inventory(inventoryData);

            expect(inventory.price).toBe(1000);
        });
    });
});