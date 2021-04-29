import * as React from 'react'
import { Text } from 'react-native'
import OtherScreen from './OtherScreen'
import MyScreen from './MyScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Mine"
        options={{ tabBarIcon: () => <Text>🐱</Text> }}
        component={MyScreen} />
      <Tab.Screen
        name="Your"
        options={{ tabBarIcon: () => <Text>🐻</Text> }}
        component={OtherScreen} />
    </Tab.Navigator>
  )
}

export default HomeScreen
