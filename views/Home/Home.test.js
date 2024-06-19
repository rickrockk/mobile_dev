import React from 'react';
import { render } from '@testing-library/react-native';
import Home from './Home';

test('renders Home component correctly', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Home')).toBeTruthy();
});
