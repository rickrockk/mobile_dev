import React from 'react';
import { render } from '@testing-library/react-native';
import Profile from "./Profile";

test('renders Profile component correctly', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Profile')).toBeTruthy();
});
