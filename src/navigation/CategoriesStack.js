import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryProductsScreen from '../screens/CategoryProductsScreen';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoriesHome"
        component={CategoriesScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CategoryProducts"
        component={CategoryProductsScreen}
        
        options={({ route }) => ({
          title: route.params?.title,
           headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

export default CategoriesStack;
