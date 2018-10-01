
import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,ScrollView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker, Item } from 'native-base';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
             totalseats: this.props.navigation.state.params.total,
             myseats:this.props.navigation.state.params.myseats,
            array:[],co:true,data:[]
        };
       
     
      
    }




    
    render() {
     
        

//const {uid} =firebase.auth().currentUser;
const { navigate } = this.props.navigation;
const { params } = this.props.navigation;
return (
    <View >
    <Text>Ahmed kasjkb</Text>
       <Text>{this.state.myseats} </Text>
       <Text>{this.state.totalseats}</Text>
    </View>

);
}

}    
