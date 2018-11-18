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
import  { Notification } from 'react-native-firebase';

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

import profile from './components/profile';
import ticket from './components/ticket';
import food from './components/food';
export default class App extends Component {
 
  constructor() {
    super();
    // this.ref = firebase.firestore().collection('drivers');
    // console.log(this.ref);
}
async componentDidMount(){

// Build a channel
const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  .setDescription('My apps test channel');

// Create the channel
firebase.notifications().android.createChannel(channel);

  const enabled =  await firebase.messaging().hasPermission();
  if (enabled) {
    console.log(enabled);
    // let token =await firebase.messaging().getToken();
    
    // console.log(token);
      // user has permissions
  } else {
      // user doesn't have permission
      console.log("this is else");
      console.log(enabled);
      firebase.messaging().requestPermission()
  .then(() => {
    // User has authorised  
  })
  .catch(error => {
    // User has rejected permissions  
  });
  }
  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    // Process your notification as required
   
    // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
    console.log(notification);
  });
  this.notificationListener = firebase.notifications().onNotification((notification) => {
    console.log(notification);
    // Process your notification as required
});

const notificationOpen = await firebase.notifications().getInitialNotification();
if (notificationOpen) {
    // App was opened by a notification
    // Get the action triggered by the notification being opened
    const action = notificationOpen.action;
    console.log(action);
    // Get information about the notification that was opened
    const notification = notificationOpen.notification;
    console.log(notification);
}

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
    screen:home,
    navigationOptions:{
      header:null
    }
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
  Food : {
    screen:food
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
    title:"Booking",
    headerTitleStyle: {
      textAlign:'center',flex:1,
      marginRight: 55,
     }
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
  },
  Profile : {
    screen:profile,
    navigationOptions:{
      header : null
    }
  },
  Ticket : {
    screen:ticket,
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
