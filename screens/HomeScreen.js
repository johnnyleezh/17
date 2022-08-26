import React, { Component } from 'react';

import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogBox} from 'react-native';
LogBox.ignoreLogs (['EventEmitter.removeListener']);
import { useNavigation } from '@react-navigation/core'

import HomePage from './HomePage';
import Movies from './Movies';
import ContactUsPage from './ContactUsPage';
import LoginScreen from './LoginScreen';
import { auth } from '../firebase'



const Tab = createBottomTabNavigator ();

const RouteMapper = (route, navigator) => {
  if (route.name == 'Movies') {
    return <Movies navigator={navigator} />;
  }
};





export default class App extends Component {
  
  render() {
   
    return (
      <NavigationContainer independent={true}>
 
          
         <Tab.Navigator 
         >
          <Tab.Screen 
            name="Home"
            component={HomePage}
            options={{ 
              tabBarIcon: () => {
                return <Ionicons name="home" size={20} color={'red'} />;
              },
            }}
          />

    

          <Tab.Screen
            name="Movies"
            component={Movies}
            options={{
              tabBarIcon: () => {
                return <Ionicons name="film" size={20} color={'blue'} />;
              },
            }}
          />
          
          <Tab.Screen
            name="Profile"
            component={ContactUsPage}
            options={{ 
              tabBarIcon: () => {
                return <Ionicons name="person" size={20} color={'green'} />;
              },
            }}
            />
            
       

        </Tab.Navigator>
        
      </NavigationContainer>

     
    );
  }
}

