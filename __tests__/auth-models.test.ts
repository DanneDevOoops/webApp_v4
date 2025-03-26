import * as SecureStore from 'expo-secure-store';
import {
    checkLoggedInStatus,
    login,
    logout,
    register,
} from '../models/auth-models';
import {
    afterEach,
    beforeEach,
    describe,
    expect,
    it,
    jest,
} from '@jest/globals';

jest.mock('expo-secure-store');

describe('checkLoggedInStatus user function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('should return true if token exists', async () => {
        SecureStore.getItemAsync.mockResolvedValue('token');
        const result = await checkLoggedInStatus();
        expect(result).toBe(true);
    });

    it('should return false if token does not exist', async () => {
        SecureStore.getItemAsync.mockResolvedValue(null);
        const result = await checkLoggedInStatus();
        expect(result).toBe(false);
    });
});

describe('login user function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('should store token on successful login', async () => {
        const mockResponse = {
            data: { token: 'token', message: 'Success', type: 'success' },
        };
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await login('email', 'password');
        expect(SecureStore.setItemAsync).toHaveBeenCalledWith('token', 'token');
        expect(result).toEqual({
            title: 'Inloggning',
            message: 'Success',
            type: 'success',
        });
    });

    it('should return error message on failed login', async () => {
        const mockResponse = {
            errors: { title: 'Error', detail: 'Invalid credentials' },
        };
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await login('email', 'password');
        expect(result).toEqual({
            title: 'Error',
            message: 'Invalid credentials',
            type: 'danger',
        });
    });
});

describe('logout user function', () => {
    it('should remove the token from secure storage', async () => {
        SecureStore.deleteItemAsync = jest.fn();
        await logout();
        expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('token');
    });
});

describe('register new user function', () => {
    beforeEach(() => {
        global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
    });

    afterEach(() => {
        jest.restoreAllMocks();
        jest.resetAllMocks();
    });

    it('should return server response on successful registration', async () => {
        const mockResponse = {
            data: { message: 'Registration successful', type: 'success' },
        };
        global.fetch.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        } as unknown as Response);

        const result = await register('test@example.com', 'password123');
        expect(result).toEqual(mockResponse);
    });

    it('should throw an error if registration fails', async () => {
        global.fetch.mockResolvedValue({
            ok: false,
            status: 400,
        } as Response);

        await expect(
            register('test@example.com', 'password123'),
        ).rejects.toThrow('Server responded with status: 400');
    });
});
