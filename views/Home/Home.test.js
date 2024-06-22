import 'react-native';
import React from 'react';
import Home from "./Home";
import { render, fireEvent, waitFor, act, screen } from '@testing-library/react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import Mock from "react-native-safe-area-context/jest/mock";

jest.mock('axios');
jest.mock('expo-image-picker', () => {
    return {
        requestMediaLibraryPermissionsAsync: jest.fn(),
        launchImageLibraryAsync: jest.fn(),
        MediaTypeOptions: {
            Images: 'Images'
        }
    };
});

const navigation = { navigate: jest.fn() };

test('renders Home correctly', () => {
    const { getByText, getByPlaceholderText } = render(<Home navigation={navigation} />);
    expect(getByText('Домашняя страница')).toBeTruthy();
    expect(getByPlaceholderText('Введите текст')).toBeTruthy();
});

test('navigates to Profile', () => {
    const { getByText } = render(<Home navigation={navigation} />);
    fireEvent.press(getByText('Перейти к профилю'));
    expect(navigation.navigate).toHaveBeenCalledWith('Profile');
});

test('fetches and displays images from API', async () => {
    Home.response = {data: {}};
    const mockData = [
        { id: '2jp', url: 'https://cdn2.thecatapi.com/images/2jp.jpg', width: 500, height: 359 },
        { id: '7dj', url: 'https://cdn2.thecatapi.com/images/7dj.jpg', width: 500, height: 332 },
        { id: '882', url: 'https://cdn2.thecatapi.com/images/882.jpg', width: 612, height: 612 },
        { id: '989', url: 'https://cdn2.thecatapi.com/images/989.jpg', width: 640, height: 960 },
        { id: '9jk', url: 'https://cdn2.thecatapi.com/images/9jk.jpg', width: 640, height: 427 },
        { id: 'ag6', url: 'https://cdn2.thecatapi.com/images/ag6.png', width: 1024, height: 1024 },
        { id: 'bgj', url: 'https://cdn2.thecatapi.com/images/bgj.jpg', width: 500, height: 332 },
        { id: 'bsh', url: 'https://cdn2.thecatapi.com/images/bsh.jpg', width: 1000, height: 750 },
        { id: 'c02', url: 'https://cdn2.thecatapi.com/images/c02.png', width: 614, height: 408 },
        { id: 'cv0', url: 'https://cdn2.thecatapi.com/images/cv0.gif', width: 248, height: 229 },
    ];
    axios.get.mockResolvedValueOnce({ data: mockData });

    render(<Home navigation={navigation} />);
    act(() => {
        fireEvent.press(screen.getByText('Показать изображения из API'));
    });

    await waitFor(() => {
        mockData.forEach(async ({ url }) => {
            const image = await screen.findByRole('image', { name: url });
            expect(image).toBeTruthy();
        });
    });
});

test('toggles local images display', async () => {
    const { getByText } = render(<Home navigation={navigation} />);

    act(() => {
        fireEvent.press(getByText('Показать загруженные изображения'));
    })
    expect(getByText('Скрыть загруженные изображения')).toBeTruthy();
});

