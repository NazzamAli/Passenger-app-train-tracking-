import React, {Component} from 'react';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';
 import foodhistory from './foodhistory';
import test from './test';

export default class App extends Component 
 {
    constructor(props){
        super(props);
        console.log(this.props.navigation.state.params.id);
    }

    componentWillUnmount(){
      console.log("appnavi");
      
    }


  static navigationOptions = {
    header :null
  }

   render(){
     return(
       
       <AppTabNavigator navigation={this.props.navigation} screenProps={this.props.navigation.state.params.id} 
          
       />
       
     );
   }


 }
 const AppTabNavigator = createMaterialBottomTabNavigator({
   Test:{
     screen: test,
    
     navigationOptions: {
       tabBarLabel: 'Food Order',
       tabBarIcon: ({tintColor}) => <Icon size={24} name="food" type="material-community" color='#fff' />,
     },

   },
   Foodhistory:{
    screen: foodhistory,
    navigationOptions: {
        tabBarLabel: 'Order History',
        tabBarIcon: ({tintColor}) => <Icon size={24} name="history" color='#fff' />,
      },
  },
 
},
{
    initialRouteName: 'Test',
    activeColor: '#f0edf6',
    inactiveColor: '#3e2465',
    barStyle: { backgroundColor: '#694fad' },
    shifting : true,
    barStyle : true 
});

App.router = AppTabNavigator.router;
