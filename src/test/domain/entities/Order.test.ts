import { Order } from '../../../domain/entities/Order';
import { IOrder, OrderStatus } from '../../../domain/models/interfaces/IOrder';

describe('Order Entity', () => {
    describe('Given complete order data', () => {
        it('should create order with all properties correctly assigned', () => {
            const orderData: IOrder = {
                _id: 'order-123',
                orderNumber: 'ORD-20241201-ABC12',
                preorderId: 'pre-456',
                userId: 'user-789',
                products: [
                    {
                        productId: 'prod-1',
                        name: 'Test Product',
                        quantity: 2,
                        price: 50,
                        categoryId: 'cat-1',
                        categoryName: 'Electronics'
                    }
                ],
                shippingAddress: {
                    country: 'Colombia',
                    state: 'Antioquia',
                    city: 'Medellin',
                    neighborhood: 'Poblado',
                    address: 'Calle 123 #45-67',
                    postalCode: '050001'
                },
                paymentMethod: 'credit_card',
                shippingCost: 10000,
                total: 110000,
                status: OrderStatus.PENDING,
                createdAt: new Date('2024-01-01'),
                updatedAt: new Date('2024-01-02'),
                confirmedAt: new Date('2024-01-03'),
                emailSent: true
            };

            const order = new Order(orderData);

            expect(order._id).toBe('order-123');
            expect(order.orderNumber).toBe('ORD-20241201-ABC12');
            expect(order.preorderId).toBe('pre-456');
            expect(order.userId).toBe('user-789');
            expect(order.products).toHaveLength(1);
            expect(order.products[0].productId).toBe('prod-1');
            expect(order.shippingAddress.country).toBe('Colombia');
            expect(order.paymentMethod).toBe('credit_card');
            expect(order.shippingCost).toBe(10000);
            expect(order.total).toBe(110000);
            expect(order.status).toBe(OrderStatus.PENDING);
            expect(order.emailSent).toBe(true);
        });

        it('should be an instance of Order class', () => {
            const orderData: IOrder = {
                orderNumber: 'ORD-001',
                preorderId: 'pre-1',
                userId: 'user-1',
                products: [],
                shippingAddress: {
                    country: 'Colombia',
                    state: 'Antioquia',
                    city: 'Medellin',
                    neighborhood: 'Centro',
                    address: 'Calle 1',
                    postalCode: '050001'
                },
                paymentMethod: 'cash',
                shippingCost: 0,
                total: 100,
                status: OrderStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
                emailSent: false
            };

            const order = new Order(orderData);

            expect(order).toBeInstanceOf(Order);
        });
    });

    describe('Given minimal order data', () => {
        it('should create order with default values', () => {
            const minimalData: IOrder = {
                orderNumber: 'ORD-MIN-001',
                preorderId: 'pre-min',
                userId: 'user-min',
                products: [],
                shippingAddress: {
                    country: 'Colombia',
                    state: 'Bogota',
                    city: 'Bogota',
                    neighborhood: 'Centro',
                    address: 'Calle Principal',
                    postalCode: '110001'
                },
                paymentMethod: 'cash',
                shippingCost: 0,
                total: 50,
                status: OrderStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
                emailSent: false
            };

            const order = new Order(minimalData);

            expect(order.orderNumber).toBe('ORD-MIN-001');
            expect(order.products).toEqual([]);
            expect(order.emailSent).toBe(false);
            expect(order.confirmedAt).toBeUndefined();
        });
    });

    describe('Given different order statuses', () => {
        const baseOrderData: IOrder = {
            orderNumber: 'ORD-STATUS-001',
            preorderId: 'pre-1',
            userId: 'user-1',
            products: [],
            shippingAddress: {
                country: 'Colombia',
                state: 'Valle',
                city: 'Cali',
                neighborhood: 'Norte',
                address: 'Carrera 1',
                postalCode: '760001'
            },
            paymentMethod: 'debit_card',
            shippingCost: 5000,
            total: 75000,
            status: OrderStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
            emailSent: false
        };

        it('should create order with PENDING status', () => {
            const orderData = { ...baseOrderData, status: OrderStatus.PENDING };
            const order = new Order(orderData);

            expect(order.status).toBe(OrderStatus.PENDING);
        });

        it('should create order with CONFIRMED status', () => {
            const orderData = { ...baseOrderData, status: OrderStatus.CONFIRMED };
            const order = new Order(orderData);

            expect(order.status).toBe(OrderStatus.CONFIRMED);
        });

        it('should create order with SHIPPED status', () => {
            const orderData = { ...baseOrderData, status: OrderStatus.SHIPPED };
            const order = new Order(orderData);

            expect(order.status).toBe(OrderStatus.SHIPPED);
        });

        it('should create order with DELIVERED status', () => {
            const orderData = { ...baseOrderData, status: OrderStatus.DELIVERED };
            const order = new Order(orderData);

            expect(order.status).toBe(OrderStatus.DELIVERED);
        });

        it('should create order with CANCELLED status', () => {
            const orderData = { ...baseOrderData, status: OrderStatus.CANCELLED };
            const order = new Order(orderData);

            expect(order.status).toBe(OrderStatus.CANCELLED);
        });
    });

    describe('Given order with multiple products', () => {
        it('should handle multiple products correctly', () => {
            const orderData: IOrder = {
                orderNumber: 'ORD-MULTI-001',
                preorderId: 'pre-multi',
                userId: 'user-multi',
                products: [
                    {
                        productId: 'prod-1',
                        name: 'Product 1',
                        quantity: 2,
                        price: 25000,
                        categoryId: 'cat-1',
                        categoryName: 'Electronics'
                    },
                    {
                        productId: 'prod-2',
                        name: 'Product 2',
                        quantity: 1,
                        price: 50000,
                        categoryId: 'cat-2',
                        categoryName: 'Clothing'
                    }
                ],
                shippingAddress: {
                    country: 'Colombia',
                    state: 'Santander',
                    city: 'Bucaramanga',
                    neighborhood: 'Centro',
                    address: 'Calle Real',
                    postalCode: '680001'
                },
                paymentMethod: 'transfer',
                shippingCost: 15000,
                total: 115000,
                status: OrderStatus.PENDING,
                createdAt: new Date(),
                updatedAt: new Date(),
                emailSent: false
            };

            const order = new Order(orderData);

            expect(order.products).toHaveLength(2);
            expect(order.products[0].name).toBe('Product 1');
            expect(order.products[1].name).toBe('Product 2');
            expect(order.total).toBe(115000);
        });
    });

    describe('Given order with confirmation date', () => {
        it('should set confirmedAt when provided', () => {
            const confirmedDate = new Date('2024-01-15');
            const orderData: IOrder = {
                orderNumber: 'ORD-CONF-001',
                preorderId: 'pre-conf',
                userId: 'user-conf',
                products: [],
                shippingAddress: {
                    country: 'Colombia',
                    state: 'Cundinamarca',
                    city: 'Bogota',
                    neighborhood: 'Chapinero',
                    address: 'Zona Rosa',
                    postalCode: '110001'
                },
                paymentMethod: 'credit_card',
                shippingCost: 0,
                total: 60000,
                status: OrderStatus.CONFIRMED,
                createdAt: new Date(),
                updatedAt: new Date(),
                confirmedAt: confirmedDate,
                emailSent: true
            };

            const order = new Order(orderData);

            expect(order.confirmedAt).toEqual(confirmedDate);
            expect(order.status).toBe(OrderStatus.CONFIRMED);
        });
    });
});