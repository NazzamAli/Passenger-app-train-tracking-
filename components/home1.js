

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight, ListItem, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';





export default class App extends Component {

  constructor() {
    super();
    this.state = { currentUser: null, dataArray: [], loading: false, refreshing: false, user: {} };
   
  }
  
  static navigationOptions = {
    header: null
  }

  render() {
    const { navigate } = this.props.navigation
    // const {uid} =firebase.auth().currentUser;
    return (
      this.state.loading
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#330066" animating></ActivityIndicator>
          <Text>Loading.....</Text>
        </View>
        :
        <View style={styles.container}>

          <View style={styles.corusel}>

          </View>

          <View style={styles.down}>

            <View style={styles.downitems}>
              <View style={styles.downinner}>
              {/* <Image source={{uri: 'https://www.flaticon.com/authors/eucalyp'}} style={{width: 40, height: 40}} /> */}
                <Image source={require('../images/ico.png')} style={{width: 40, height: 40}} />
                <TouchableOpacity onPress={() => navigate('Timings')}>

                  <Icon color="white" name="clock-o" type='font-awesome' size={65} />
                  <Text style={styles.text}>Timings</Text>

                </TouchableOpacity>

              </View>
            </View>

           

            <View style={styles.downitems}>
              <View style={styles.downinner}>

                <TouchableOpacity onPress={() => navigate('home1')}>

                  <Icon color="white" name="clock-o" type='font-awesome' size={65} />
                  <Text style={styles.text}>Booking</Text>

                </TouchableOpacity>
              </View>
            </View>

     
          </View>




        </View>











    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'gray',
  },
  corusel: {
    backgroundColor: 'purple',
    height: '45%',
  },
  down: {
    height: '55%',
    backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  downitems: {
    width: '50%',
    height: '50%',
    padding: 5,
  },
  downinner: {
    flex: 1,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }



})