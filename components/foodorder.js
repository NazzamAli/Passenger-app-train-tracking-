

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
   

  }
 
  componentDidMount() {
    this.GetData();
  }
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
        <Text>Select the Food you want??</Text>

          

        </View>

    );
  }
}

