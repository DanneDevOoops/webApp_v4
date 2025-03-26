import React from 'react';
import { render } from '@testing-library/react-native';
import { CoverImage } from '../components/utils/cover-image';
import coverIMG from 'assets/img/NutsAndBolts-1.jpg';

describe('Testing cover-image component render', () => {
    it('renders correctly with a local image', () => {
        const { getByText, getByTestId } = render(
            <CoverImage
                image={coverIMG}
                headerText='Local Image Header'
            />,
        );

        expect(getByTestId('cover-image')).toBeTruthy();
        expect(getByText('Local Image Header')).toBeTruthy();
    });
});
