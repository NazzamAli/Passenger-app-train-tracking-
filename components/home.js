

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight, ListItem, RefreshControl,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';





export default class App extends Component {

  constructor() {
    super();
    this.state = { dataArray: [], loading: true, refreshing: false };
    this.ref = firebase.firestore().collection('trainroutes');


    //console.log("maniiie "+names[0]);
    //console.log("maniiie "+names[1]);
    //console.log("dataarray djd "+this.state.dataArray[0]);


  }
  rou = ({ item }) => {
    ToastAndroid.show(item, ToastAndroid.SHORT);


    this.props.navigation.navigate('home1', { message: item });
  }
  componentDidMount() {
    this.GetData();

  }
  GetData = () => {
    var names = [];
    this.ref.onSnapshot(query => {
      query.forEach(doc => {
        names.push(doc.data().name);
      });
      this.setState({ dataArray: names });
      this.setState({ loading: false })
    });

  }
  _onResfresh() {
    this.setState({ refreshing: true });
    this.setState({ dataArray: [] });
    this.GetData();
    this.setState({ refreshing: false });


  }
  renderItem = ({ item }) => {
    var { navigate } = this.props.navigation
    return (
      <TouchableOpacity onPress={() => navigate('home1', { message: item })}>

        <Text style={{ fontSize: 25, marginBottom: 10 }}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: "#CED0CE",
          //marginLeft:"14%"
        }}

      />
    );
  };

  static navigationOptions = {
    header: null
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      this.state.loading
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#330066" animating></ActivityIndicator>
        </View>
        :
        <View style={
          { flex: 1, }
        }
        >

          <TouchableOpacity
            onPress={() => navigate('Timings')}>

            <Text >Timings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('Home')}>

            <Text >Ticket Booking</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigate('FoodOrder')}>

            <Text >Food Order</Text>
          </TouchableOpacity>

        </View>

    );
  }
}

