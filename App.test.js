import 'react-native';
import React from 'react';
import App from "./App";
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => {
    return {
        NavigationContainer: ({ children }) => children,
    };
});

jest.mock('@react-navigation/stack', () => {
    return {
        createStackNavigator: jest.fn().mockReturnValue({
            Navigator: ({ children }) => children,
            Screen: ({ children }) => children,
        }),
    };
});

test('renders App correctly', () => {
    render(
        <NavigationContainer>
            <App />
        </NavigationContainer>
    );
});
