// Импортируем необходимые модули и библиотеки
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const App = () => {
  // Состояние для управления текстовым вводом
  const [text, setText] = useState('');
  // Состояние для управления видимым экраном
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // Функция для переключения экранов
  const toggleScreen = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <View style={styles.container}>
      {isProfileVisible ? (
        // Экран профиля
        <View style={styles.screenContainer}>
          <Text style={styles.title}>Экран профиля</Text>
          <Button title="Вернуться назад" onPress={toggleScreen} />
        </View>
      ) : (
        // Домашняя страница
        <View style={styles.screenContainer}>
          <Text style={styles.title}>Домашняя страница</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите текст"
            value={text}
            onChangeText={setText}
          />
          <Button title="Перейти к профилю" onPress={toggleScreen} />
        </View>
      )}
    </View>
  );
};

// Стили для приложения
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 5,
    borderWidth: 1,
    marginBottom: 16,
    width: '100%',
    padding: 8,
  },
});

export default App;
