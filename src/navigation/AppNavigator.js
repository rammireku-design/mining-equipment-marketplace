import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/colors';
import { Home, PlusSquare, ShoppingBag, User } from 'lucide-react-native';

// Screens
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import BuyerHomeScreen from '../screens/buyer/BuyerHomeScreen';
import ItemDetailScreen from '../screens/buyer/ItemDetailScreen';
import AdminHomeScreen from '../screens/admin/AdminHomeScreen';
import UploadItemScreen from '../screens/admin/UploadItemScreen';
import InquiriesScreen from '../screens/admin/InquiriesScreen';
import EditItemScreen from '../screens/admin/EditItemScreen';
import { Inbox } from 'lucide-react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Buyer Tabs
function BuyerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primaryDark,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 85, // better height for modern phones
          paddingBottom: 20, // safe area padding
        },
      }}
    >
      <Tab.Screen 
        name="Market" 
        component={BuyerHomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <ShoppingBag color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={BuyerHomeScreen} // Placeholder for profile
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}

// Admin Tabs
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text, // Admin uses black for active
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          elevation: 0,
          shadowOpacity: 0,
          height: 85,
          paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={AdminHomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tab.Screen 
        name="Inquiries" 
        component={InquiriesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Inbox color={color} size={size} />
        }}
      />
    </Tab.Navigator>
  );
}

// Main Stack
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="BuyerFlow" component={BuyerTabs} />
        <Stack.Screen name="AdminFlow" component={AdminTabs} />
        
        {/* Modals or Stack screens inside flows */}
        <Stack.Screen 
          name="ItemDetail" 
          component={ItemDetailScreen} 
          options={{ presentation: 'fullScreenModal' }}
        />
        <Stack.Screen 
          name="EditItem" 
          component={EditItemScreen} 
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen 
          name="UploadItem" 
          component={UploadItemScreen} 
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
