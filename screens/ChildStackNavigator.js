import TrolleyScreen from './TrolleyScreen';
import ConfirmScreen from './ConfirmScreen';
import { Text, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


const StackNav = createStackNavigator();

export default class ChildStackNavigator extends Component {
  render() {
    return (
      <StackNav.Navigator initialRouteName="Trolley">
        <StackNav.Screen
          name="Trolley"
          component={TrolleyScreen}
          options={{ headerShown: false, }}
        />
        <StackNav.Screen
          name="Confirm"
          component={ConfirmScreen}
          options={{ headerShown: false }}
        />
      </StackNav.Navigator>

    );
  }
}