import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KanbanScreen } from './src/screens/KanbanScreen';
import { AddApplicationScreen } from './src/screens/AddApplicationScreen';
import { DetectionInboxScreen } from './src/screens/DetectionInboxScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
              Board: 'grid-outline',
              Add: 'add-circle-outline',
              Detection: 'sparkles-outline'
            };
            return <Ionicons name={iconMap[route.name]} size={size} color={color} />;
          }
        })}
      >
        <Tab.Screen name="Board" component={KanbanScreen} />
        <Tab.Screen name="Add" component={AddApplicationScreen} />
        <Tab.Screen name="Detection" component={DetectionInboxScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
