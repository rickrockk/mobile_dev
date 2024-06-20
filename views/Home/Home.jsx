import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Image, Platform, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function Home({ navigation }) {
    const [text, setText] = useState('');
    const [showApiImages, setShowApiImages] = useState(false);
    const [showLocalImages, setShowLocalImages] = useState(false);
    const [apiImages, setApiImages] = useState([]);
    const [localImages, setLocalImages] = useState([]);

    const bg = require('../../assets/bg.jpg')

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
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Permission to access camera roll is required!');
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            const newImage = {
                id: Date.now().toString(),
                url: pickerResult.assets[0].uri,
            };
            setLocalImages([...localImages, newImage]);
        } else {
            console.log("Image Picker Cancelled");
        }
    };


    return (
        <View style={styles.container}>
            <ImageBackground source={Platform.OS === 'ios' ? bg : 'none'} resizeMode="cover" style={styles.bg}>
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
                        contentContainerStyle={styles.listContent}
                        data={apiImages}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image source={{ uri: item.url }} style={styles.image} />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}

                <Button style={styles.button} title="Загрузить изображение" onPress={uploadCatImage} />

                <TouchableOpacity onPress={() => setShowLocalImages(!showLocalImages)} style={styles.toggleButtonContainer}>
                    <Text style={styles.toggleButton}>{showLocalImages ? 'Скрыть загруженные изображения' : 'Показать загруженные изображения'}</Text>
                </TouchableOpacity>
                {showLocalImages && (
                    <FlatList
                        contentContainerStyle={styles.listContent}
                        data={localImages}
                        renderItem={({ item }) => (
                            <View style={styles.card}>
                                <Image source={{ uri: item.url }} style={styles.image} />
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                )}
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        marginVertical: 20,
    },
    bg: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    input: {
        height: 44,
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 20,
        width: Platform.OS === 'web' ? '40%' : '90%',
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    toggleButtonContainer: {
        marginBottom: 20,
        backgroundColor: 'transparent',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    toggleButton: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center',
    },
    button: {
       backgroundColor: Platform.OS === 'ios' ? 'white' : 'blue',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 250,
        paddingTop: 25,
        paddingBottom: 60,
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
    listContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});
