// Импортируем необходимые модули и библиотеки
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";

const Stack = createStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Домашняя страница' }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Экран профиля' }} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;
