/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'react-native-firebase';
import {createStackNavigator} from 'react-navigation';
import login from './components/login';
import home from './components/home';
import home1 from './components/home1';
import register from './components/register';
import timings from './components/timings';
import stations from './components/stations';
import foodorder from './components/foodorder';
import test from './components/test';
import additems from './components/additems';
import cart from './components/cart';
import booking from './components/booking';
import seats from './components/seats';
import myticket from './components/myticket';
import payment from './components/payment';
import mytimings from './components/mytimings';
import notifications from './components/notifications';
import penality from './components/penality';
import alert from './components/alert';
import Paypal from './components/Paypal';
import tracking from './components/tracking';
import practice from './components/practice';
export default class App extends Component {
 
  constructor() {
    super();
    // this.ref = firebase.firestore().collection('drivers');
    // console.log(this.ref);
}
 
 static navigationOptions = {
   header :null
 }
  
  render() {
    return (
        <AppStackNavigator/>
    );
  }
}
const  AppStackNavigator=createStackNavigator({
  Login: {
    screen:login,    
  },
  Home :{
    screen:home
  },
  Register :{
    screen:register
  },
  Home1 : {
    screen:home1
  },
  Timings : {
    screen :timings
  },
  Stations :{
    screen:stations
  },
  FoodOrder :{
    screen:foodorder
  },
  Test : {
    screen:test
  },
  AddItems :{
    screen:additems
  },
  Cart :{
    screen:cart
  },
  Booking:{
    screen :booking,
   navigationOptions:{
     header:null
   }
   
  },
  Seats:{
    screen :seats,
   navigationOptions:{
     header:null
   },
  },
  Payment : {
    screen:payment,
    navigationOptions:{
      header : null
    }
  },
  Myticket : {
    screen:myticket,
    navigationOptions:{
      header : null
    }
  },
  Mytimings : {
    screen:mytimings,
    navigationOptions:{
      header : null
    }
  },
  Notifications : {
    screen:notifications,
    navigationOptions:{
      header : null
    }
  },
  Penality : {
    screen:penality,
    navigationOptions:{
      header : null
    }
  },
  Alert : {
    screen:alert,
    navigationOptions:{
      header : null
    }
  },
  Practice : {
    screen:practice,
    navigationOptions:{
      header : null
    }
  },
  Paypal : {
    screen:Paypal,
    navigationOptions:{
      header : null
    }
  },
  Tracking : {
    screen:tracking,
    navigationOptions:{
      header : null
    }
  }
  
  
  
},
{
  initialRouteName: 'Login',
},
);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
  
// });
