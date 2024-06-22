import 'react-native';
import React from 'react';
import Profile from "./Profile";
import { render } from '@testing-library/react-native';

test('renders Profile correctly', () => {
    const { getByText } = render(<Profile />);
    expect(getByText('Экран профиля')).toBeTruthy();
});
