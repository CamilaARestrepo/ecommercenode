import { createRequest, createResponse } from 'node-mocks-http'
import { createUser } from '../../../application/controllers/user-controller'

/*
jest.mock('../../../domain/services/user-services', () => ({
    saveUser: jest.fn(() => ({
        _id: '123-123',
        email: "norbeytest@gmail.com",
        password: "PruebaTest123.",
        firstName: "NorbeyTest",
        lastName: "MejiaTest",
        idType: "cc",
        idNumber: "123456789",
        phone: "3161234567",
        roleId: "USER",
        status: "ACTIVE"
    }))
}));
*/

jest.mock('../../../domain/services/user-services', () => {
    const actual = jest.requireActual('../../../domain/services/user-services');
    return {
        ...actual,
        saveUser: jest.fn(() => ({
            _id: '123-123',
            email: "norbeytest@gmail.com",
            password: "PruebaTest123.",
            firstName: "NorbeyTest",
            lastName: "MejiaTest",
            idType: "cc",
            idNumber: "123456789",
            phone: "3161234567",
            roleId: "USER",
            status: "ACTIVE"
        }))
    };
});



describe('user-controller tests', () => {
    describe('when created user successfully', () => {
        test('should return status 201 and user data', async () => {
            const mockNewUser = {
                email: "norbeytest@gmail.com",
                password: "PruebaTest123.",
                firstName: "NorbeyTest",
                lastName: "MejiaTest",
                idType: "cc",
                idNumber: "123456789",
                phone: "3161234567",
                roleId: "USER",
            }

            const request = createRequest({
                body: mockNewUser
            });
            const response = createResponse();

            await createUser(request, response);

            expect(response.statusCode).toBe(201);

            const data = response._getJSONData();
            expect(data).toEqual({
                ok: true,
                message: 'User created successfully',
                user: {
                    id: '123-123',
                    email: "norbeytest@gmail.com",
                    firstName: "NorbeyTest",
                    lastName: "MejiaTest",
                    idType: "cc",
                    idNumber: "123456789",
                    phone: "3161234567",
                    roleId: "USER",
                    status: "ACTIVE"
                }
            });
            /*
            expect(data.ok).toBe(true);
            expect(data.user).toBeDefined();
            expect(data.user.id).toBe('123');
            */
        });

    });
});
