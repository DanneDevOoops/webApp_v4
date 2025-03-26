import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingIndicator } from '../components/utils/loading-indicator';

describe('Testing loading-indicator.tsx component render', () => {
    it('renders correctly without loadingType', () => {
        const { getByText, getByTestId } = render(<LoadingIndicator />);

        expect(getByTestId('activity-indicator')).toBeTruthy();
        expect(getByText('Laddar...')).toBeTruthy();
    });

    it('renders correctly with loadingType', () => {
        const { getByText, getByTestId } = render(
            <LoadingIndicator loadingType='data' />,
        );

        expect(getByTestId('activity-indicator')).toBeTruthy();
        expect(getByText('Laddar data...')).toBeTruthy();
    });
});
