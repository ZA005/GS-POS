import React from 'react';
import { render } from '@testing-library/react-native';
import CardComponent from './CardComponent';

describe('CardComponent', () => {
    it('renders correctly with given props', () => {
        // Arrange
        const props = {
            productName: 'Test Product',
            currentPrice: 150.0,
            lastUpdated: '2024-11-29',
        };

        // Act
        const { getByText } = render(<CardComponent {...props} />);

        // Assert
        expect(getByText('Product Name')).toBeTruthy();
        expect(getByText('Current Price')).toBeTruthy();
        expect(getByText('Last Price Updated')).toBeTruthy();
        expect(getByText('Test Product')).toBeTruthy();
        expect(getByText('₱ 150')).toBeTruthy();
        expect(getByText('2024-11-29')).toBeTruthy();
    });
});
