import { Product } from '../../../domain/entities/Product';
import { IProduct } from '../../../domain/models/interfaces/IProduct';

describe('Product Entity', () => {
    describe('Given complete product data', () => {
        it('should create product with all properties correctly assigned', () => {
            const productData: IProduct & { id?: string; reservedStock?: number } = {
                id: 'prod-123',
                name: 'Test Product',
                description: 'A test product description',
                cost: 99.99,
                categoryId: 'cat-456',
                images: ['image1.jpg', 'image2.jpg'],
                providers: ['prov-1', 'prov-2'],
                reservedStock: 10,
                isDiscontinued: false
            };

            const product = new Product(productData);

            expect(product.id).toBe('prod-123');
            expect(product.name).toBe('Test Product');
            expect(product.description).toBe('A test product description');
            expect(product.cost).toBe(99.99);
            expect(product.categoryId).toBe('cat-456');
            expect(product.images).toEqual(['image1.jpg', 'image2.jpg']);
            expect(product.providers).toEqual(['prov-1', 'prov-2']);
            expect(product.reservedStock).toBeUndefined();
            expect(product.isDiscontinued).toBe(false);
        });

        it('should be an instance of Product class', () => {
            const productData: IProduct = {
                name: 'Test Product',
                description: 'Description',
                cost: 50,
                categoryId: 'cat1',
                images: ['image.jpg'],
                providers: ['prov-1']
            };

            const product = new Product(productData);

            expect(product).toBeInstanceOf(Product);
        });
    });

    describe('Given minimal required data', () => {
        it('should create product with default values', () => {
            const minimalData: IProduct = {
                name: 'Minimal Product',
                description: 'Minimal description',
                cost: 25.50,
                categoryId: 'cat-minimal',
                images: ['minimal.jpg'],
                providers: []
            };

            const product = new Product(minimalData);

            expect(product.name).toBe('Minimal Product');
            expect(product.description).toBe('Minimal description');
            expect(product.cost).toBe(25.50);
            expect(product.categoryId).toBe('cat-minimal');
            expect(product.images).toEqual(['minimal.jpg']);
            expect(product.providers).toEqual([]);
            expect(product.isDiscontinued).toBe(false);
            expect(product.id).toBe('');
        });
    });

    describe('Given product without optional fields', () => {
        it('should set default values for optional fields', () => {
            const productData: IProduct = {
                name: 'Product Without Optionals',
                description: 'Description',
                cost: 100,
                categoryId: 'cat1',
                images: ['image.jpg'],
                providers: []
            };

            const product = new Product(productData);

            expect(product.providers).toEqual([]);
            expect(product.isDiscontinued).toBe(false);
            expect(product.reservedStock).toBeUndefined();
        });
    });

    describe('Given product with empty arrays', () => {
        it('should handle empty images array', () => {
            const productData: IProduct = {
                name: 'No Images Product',
                description: 'Product without images',
                cost: 75,
                categoryId: 'cat1',
                images: [],
                providers: []
            };

            const product = new Product(productData);

            expect(product.images).toEqual([]);
        });

        it('should handle empty providers array', () => {
            const productData: IProduct = {
                name: 'No Providers Product',
                description: 'Product without providers',
                cost: 60,
                categoryId: 'cat1',
                images: ['image.jpg'],
                providers: []
            };

            const product = new Product(productData);

            expect(product.providers).toEqual([]);
        });
    });

    describe('Given product with discontinued status', () => {
        it('should create discontinued product', () => {
            const productData: IProduct = {
                name: 'Discontinued Product',
                description: 'This product is discontinued',
                cost: 0,
                categoryId: 'cat1',
                images: ['discontinued.jpg'],
                providers: [],
                isDiscontinued: true
            };

            const product = new Product(productData);

            expect(product.isDiscontinued).toBe(true);
        });

        it('should create active product by default', () => {
            const productData: IProduct = {
                name: 'Active Product',
                description: 'This product is active',
                cost: 150,
                categoryId: 'cat1',
                images: ['active.jpg'],
                providers: []
            };

            const product = new Product(productData);

            expect(product.isDiscontinued).toBe(false);
        });
    });

    describe('Given product with reserved stock', () => {
        it('should set reserved stock correctly', () => {
            const productData: IProduct & { reservedStock?: number } = {
                name: 'Reserved Stock Product',
                description: 'Product with reserved stock',
                cost: 200,
                categoryId: 'cat1',
                images: ['reserved.jpg'],
                providers: [],
                reservedStock: 25
            };

            const product = new Product(productData);

            expect(product.reservedStock).toBeUndefined();
        });

        it('should handle zero reserved stock', () => {
            const productData: IProduct & { reservedStock?: number } = {
                name: 'Zero Reserved Product',
                description: 'Product with zero reserved stock',
                cost: 80,
                categoryId: 'cat1',
                images: ['zero.jpg'],
                providers: [],
                reservedStock: 0
            };

            const product = new Product(productData);

            expect(product.reservedStock).toBeUndefined();
        });
    });
});