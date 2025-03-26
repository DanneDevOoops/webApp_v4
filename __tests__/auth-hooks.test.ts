import { renderHook, act } from '@testing-library/react-hooks';
import { useSignInUser } from '../hooks/auth-hooks';
import { useAuthContext } from 'contexts/auth-provider';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { flash_message } from 'assets/utils/animation';
import {
    describe,
    expect,
    it,
    beforeEach,
    afterEach,
    jest,
} from '@jest/globals';

jest.mock('contexts/auth-provider');
jest.mock('@react-navigation/native');
jest.mock('assets/utils/animation');

describe('useSignInUser', () => {
    const mockLogin = jest.fn();
    const mockSetIsLoggedIn = jest.fn();
    const mockDispatch = jest.fn();

    beforeEach((): void => {
        (useAuthContext as jest.Mock).mockReturnValue({
            login: mockLogin,
            setIsLoggedIn: mockSetIsLoggedIn,
            isLoggedIn: false,
        });
        (useNavigation as jest.Mock).mockReturnValue({
            dispatch: mockDispatch,
        });
    });

    afterEach((): void => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('should sign in user and navigate to invoices on success', async () => {
        mockLogin.mockResolvedValue(true);

        const { result } = renderHook(() => useSignInUser());

        await act(async () => {
            await result.current.signInUser('test@example.com', 'password123');
        });

        expect(mockLogin).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
        );
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(true);
        expect(flash_message).toHaveBeenCalledWith(
            'success',
            'Inloggning lyckades!',
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            CommonActions.navigate('InvoicesScreen', {
                screen: 'InvoicesList',
                params: {},
            }),
        );
    });

    it('should handle login failure', async () => {
        mockLogin.mockResolvedValue(false);

        const { result } = renderHook(() => useSignInUser());

        await act(async () => {
            await result.current.signInUser('test@example.com', 'password123');
        });

        expect(mockLogin).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
        );
        expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
        expect(flash_message).toHaveBeenCalledWith(
            'danger',
            'Inloggning misslyckades!',
        );
        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should handle login error', async () => {
        mockLogin.mockRejectedValue(new Error('Login failed'));

        const { result } = renderHook(() => useSignInUser());

        await act(async () => {
            await result.current.signInUser('test@example.com', 'password123');
        });

        expect(mockLogin).toHaveBeenCalledWith(
            'test@example.com',
            'password123',
        );
        expect(mockSetIsLoggedIn).not.toHaveBeenCalled();
        expect(flash_message).toHaveBeenCalledWith(
            'danger',
            'Inloggning misslyckades!',
        );
        expect(mockDispatch).not.toHaveBeenCalled();
    });
});
