import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CategoriesStack from './CategoriesStack';
import CartStack from './CartStack';
import OrdersScreen from '../screens/OrdersScreen';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Categories') {
            iconName = 'grid';
          } else if (route.name === 'Cart') {
            iconName = 'shopping-cart';
          } else if (route.name === 'MyOrders') {
            iconName = 'package';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />

      <Tab.Screen
        name="Categories"
        component={CategoriesStack}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          tabPress: e => { 
            navigation.navigate('Categories', {
              screen: 'CategoriesHome',
            });
          },
        })}
      />

      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="MyOrders"
        component={OrdersScreen}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'My Orders',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={26}
              color="#000"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.navigate('Home')}
            />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
