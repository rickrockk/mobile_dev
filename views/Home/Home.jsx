import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';

export default function Home({ navigation }) {
    const [text, setText] = useState('');
    const [showApiImages, setShowApiImages] = useState(false);
    const [showLocalImages, setShowLocalImages] = useState(false);
    const [apiImages, setApiImages] = useState([]);
    const [localImages, setLocalImages] = useState([]);

    const fetchApiImages = async () => {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10');
            setApiImages(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchApiImages();
    }, []);

    const uploadCatImage = async () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
            maxWidth: 800,
            maxHeight: 600,
        };

        const response = await launchImageLibrary(options);

        if (response.didCancel) {
            Alert.alert('Image Picker', 'Image selection was cancelled');
        } else if (response.errorCode) {
            console.error(response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            const uri = response.assets[0].uri;

            const newImage = {
                id: Date.now().toString(),
                url: uri,
            };
            setLocalImages([...localImages, newImage]);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Домашняя страница</Text>
            <TextInput
                style={styles.input}
                placeholder="Введите текст"
                value={text}
                onChangeText={setText}
            />
            <Button style={styles.button} title="Перейти к профилю" onPress={() => navigation.navigate('Profile')} />

            <TouchableOpacity onPress={() => setShowApiImages(!showApiImages)} style={styles.toggleButtonContainer}>
                <Text style={styles.toggleButton}>{showApiImages ? 'Скрыть изображения из API' : 'Показать изображения из API'}</Text>
            </TouchableOpacity>
            {showApiImages && (
                <FlatList
                    data={apiImages}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.url }} style={styles.image} />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}

            <Button style={styles.button} title="Загрузить изображение" onPress={uploadCatImage} />

            <TouchableOpacity onPress={() => setShowLocalImages(!showLocalImages)} style={styles.toggleButtonContainer}>
                <Text style={styles.toggleButton}>{showLocalImages ? 'Скрыть загруженные изображения' : 'Показать загруженные изображения'}</Text>
            </TouchableOpacity>
            {showLocalImages && (
                <FlatList
                    data={localImages}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.url }} style={styles.image} />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
    },
    input: {
        height: 44,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 20,
        width: '100%',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    toggleButtonContainer: {
        marginBottom: 20,
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    toggleButton: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4, 
        elevation: 5,
        marginVertical: 10,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    image: {
        width: 200,
        height: 300,
    },
    list: {
        width: '100%',
    },
});

