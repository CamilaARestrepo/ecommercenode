import { Catalog } from '../../../domain/entities/Catalog';
import { ICatalog } from '../../../domain/models/interfaces/ICatalog';

describe('Catalog Entity', () => {
    describe('Given complete catalog data', () => {
        it('should create catalog with all properties correctly assigned', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'cat-123',
                name: 'Gaming Laptop',
                description: 'High-performance gaming laptop',
                categoryId: 'electronics-456',
                categoryName: 'Electronics',
                images: [] as any,
                isDiscontinued: false,
                price: 2500000,
                stock: 15,
                reservedStock: 3
            };
            
            // Manually assign images to test the functionality
            (catalogData as any).images = ['laptop1.jpg', 'laptop2.jpg'];

            const catalog = new Catalog(catalogData);

            expect(catalog.id).toBe('cat-123');
            expect(catalog.name).toBe('Gaming Laptop');
            expect(catalog.description).toBe('High-performance gaming laptop');
            expect(catalog.categoryId).toBe('electronics-456');
            expect(catalog.categoryName).toBe('Electronics');
            expect((catalog as any).images).toEqual(['laptop1.jpg', 'laptop2.jpg']);
            expect(catalog.isDiscontinued).toBe(false);
            expect(catalog.price).toBe(2500000);
            expect(catalog.stock).toBe(15);
            expect(catalog.reservedStock).toBe(3);
        });

        it('should be an instance of Catalog class', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'test-123',
                name: 'Test Product',
                description: 'Test Description',
                categoryId: 'cat1',
                categoryName: 'Category 1',
                price: 100000,
                stock: 10,
                reservedStock: 2
            };

            const catalog = new Catalog(catalogData);

            expect(catalog).toBeInstanceOf(Catalog);
        });
    });

    describe('Given minimal catalog data', () => {
        it('should create catalog with required fields only', () => {
            const minimalData: ICatalog & { id?: string } = {
                id: 'basic-123',
                name: 'Basic Product',
                description: 'Basic description',
                categoryId: 'basic-cat',
                categoryName: 'Basic Category',
                price: 50000,
                stock: 5,
                reservedStock: 0
            };

            const catalog = new Catalog(minimalData);

            expect(catalog.name).toBe('Basic Product');
            expect(catalog.description).toBe('Basic description');
            expect(catalog.price).toBe(50000);
            expect(catalog.stock).toBe(5);
            expect(catalog.reservedStock).toBe(0);
            expect(catalog.id).toBe('basic-123');
            expect(catalog.images).toBeUndefined();
            expect(catalog.isDiscontinued).toBeUndefined();
        });
    });

    describe('Given catalog with discontinued status', () => {
        it('should create discontinued catalog item', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'phone-123',
                name: 'Old Model Phone',
                description: 'Discontinued phone model',
                categoryId: 'phones',
                categoryName: 'Mobile Phones',
                price: 800000,
                stock: 0,
                reservedStock: 0,
                isDiscontinued: true
            };

            const catalog = new Catalog(catalogData);

            expect(catalog.isDiscontinued).toBe(true);
            expect(catalog.stock).toBe(0);
        });

        it('should create active catalog item by default', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'new-123',
                name: 'New Product',
                description: 'Latest product',
                categoryId: 'new-cat',
                categoryName: 'New Category',
                price: 150000,
                stock: 20,
                reservedStock: 5
            };

            const catalog = new Catalog(catalogData);

            expect(catalog.isDiscontinued).toBeUndefined();
        });
    });

    describe('Given catalog with images', () => {
        it('should handle multiple images', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'camera-123',
                name: 'Camera',
                description: 'Professional camera',
                categoryId: 'photo',
                categoryName: 'Photography',
                price: 3000000,
                stock: 8,
                reservedStock: 1,
                images: [] as any
            };
            
            // Manually assign images to test the functionality
            (catalogData as any).images = ['camera1.jpg', 'camera2.jpg', 'camera3.jpg'];

            const catalog = new Catalog(catalogData);

            expect((catalog as any).images).toHaveLength(3);
            expect((catalog as any).images).toContain('camera1.jpg');
            expect((catalog as any).images).toContain('camera2.jpg');
            expect((catalog as any).images).toContain('camera3.jpg');
        });

        it('should handle empty images array', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'misc-123',
                name: 'No Image Product',
                description: 'Product without images',
                categoryId: 'misc',
                categoryName: 'Miscellaneous',
                price: 75000,
                stock: 12,
                reservedStock: 0,
                images: []
            };

            const catalog = new Catalog(catalogData);

            expect((catalog as any).images).toEqual([]);
        });
    });

    describe('Given catalog with stock information', () => {
        it('should handle high stock levels', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'popular-123',
                name: 'Popular Item',
                description: 'High demand product',
                categoryId: 'popular',
                categoryName: 'Popular Items',
                price: 200000,
                stock: 100,
                reservedStock: 25
            };

            const catalog = new Catalog(catalogData);

            expect(catalog.stock).toBe(100);
            expect(catalog.reservedStock).toBe(25);
        });

        it('should handle zero stock', () => {
            const catalogData: ICatalog & { id?: string } = {
                id: 'unavailable-123',
                name: 'Out of Stock',
                description: 'Currently unavailable',
                categoryId: 'unavailable',
                categoryName: 'Unavailable',
                price: 120000,
                stock: 0,
                reservedStock: 0
            };

            const catalog = new Catalog(catalogData);

            expect(catalog.stock).toBe(0);
            expect(catalog.reservedStock).toBe(0);
        });
    });
});