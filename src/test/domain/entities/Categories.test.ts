import { Categories } from '../../../domain/entities/Categories';
import { ICategories } from '../../../domain/models/interfaces/ICategories';

describe('Categories Entity', () => {
    describe('Given complete category data', () => {
        it('should create category with all properties correctly assigned', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'cat-123',
                name: 'Electronics'
            };

            const category = new Categories(categoryData);

            expect(category.id).toBe('cat-123');
            expect(category.name).toBe('Electronics');
        });

        it('should be an instance of Categories class', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'clothing-123',
                name: 'Clothing'
            };

            const category = new Categories(categoryData);

            expect(category).toBeInstanceOf(Categories);
        });
    });

    describe('Given category without id', () => {
        it('should create category with undefined id', () => {
            const categoryData = {
                name: 'Books'
            };

            const category = new Categories(categoryData as any);

            expect(category.name).toBe('Books');
            expect(category.id).toBeUndefined();
        });
    });

    describe('Given different category names', () => {
        it('should create category with single word name', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'sports-1',
                name: 'Sports'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Sports');
            expect(category.id).toBe('sports-1');
        });

        it('should create category with multi-word name', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'home-garden-1',
                name: 'Home & Garden'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Home & Garden');
            expect(category.id).toBe('home-garden-1');
        });

        it('should create category with long descriptive name', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'automotive-parts-1',
                name: 'Automotive Parts and Accessories'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Automotive Parts and Accessories');
            expect(category.id).toBe('automotive-parts-1');
        });
    });

    describe('Given category with special characters', () => {
        it('should handle category name with ampersand', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'health-beauty-1',
                name: 'Health & Beauty'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Health & Beauty');
        });

        it('should handle category name with parentheses', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'toys-games-1',
                name: 'Toys & Games (Kids)'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Toys & Games (Kids)');
        });

        it('should handle category name with numbers', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'tech-2024',
                name: 'Tech 2024'
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('Tech 2024');
        });
    });

    describe('Given empty or minimal data', () => {
        it('should create category with empty string name', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'empty-1',
                name: ''
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('');
            expect(category.id).toBe('empty-1');
        });

        it('should create category with whitespace name', () => {
            const categoryData: ICategories & { id?: string } = {
                id: 'space-1',
                name: '   '
            };

            const category = new Categories(categoryData);

            expect(category.name).toBe('   ');
        });
    });
});