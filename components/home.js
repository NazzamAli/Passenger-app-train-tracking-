

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ToolbarAndroid, ListItem, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';





export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { currentUser: null, dataArray: [], loading: false, refreshing: false, user: {},
    routeId:this.props.navigation.state.params.id,
  };
  
    // this.ref = firebase.firestore().collection('trainroutes');


    //console.log("maniiie "+names[0]);
    //console.log("maniiie "+names[1]);
    //console.log("dataarray djd "+this.state.dataArray[0]);


  }
  // rou = ({ item }) => {
  //   ToastAndroid.show(item, ToastAndroid.SHORT);


  //   this.props.navigation.navigate('home1', { message: item });
  // }
  // componentDidMount() {
  //   this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({
  //       loading: false,
  //       user:user
  //     });
  //     console.log(user);
  //     console.log("state wala "+this.state.user);
  //   });
  //   this.GetData();

  // }
  // GetData = () => {
  //   var names = [];
  //   this.ref.onSnapshot(query => {
  //     query.forEach(doc => {
  //       names.push(doc.data().name);
  //     });
  //     this.setState({ dataArray: names });
  //     this.setState({ loading: false })
  //   });

  // }
  // _onResfresh() {
  //   this.setState({ refreshing: true });
  //   this.setState({ dataArray: [] });
  //   this.GetData();
  //   this.setState({ refreshing: false });


  // }
  // renderItem = ({ item }) => {
  //   var { navigate } = this.props.navigation
  //   return (
  //     <TouchableOpacity onPress={() => navigate('home1', { message: item })}>

  //       <Text style={{ fontSize: 25, marginBottom: 10 }}>
  //         {item}
  //       </Text>
  //     </TouchableOpacity>
  //   );
  // }

  // renderSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         height: 1,
  //         width: '100%',
  //         backgroundColor: "#CED0CE",
  //         //marginLeft:"14%"
  //       }}

  //     />
  //   );
  // };
  // componentWillUnmount() {
  //   this.authSubscription();
  // }
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
                {/* <Image source={require('../images/ico.png')} style={{width: 40, height: 40}} /> */}
                <TouchableOpacity onPress={() => navigate('Timings')}>

                  <Icon color="white" name="clock-o" type='font-awesome' size={65} />
                  <Text style={styles.text}>Timings</Text>

                </TouchableOpacity>

              </View>
            </View>

            <View style={styles.downitems}>
              <View style={styles.downinner}>

                <TouchableOpacity onPress={() => navigate('home1')}>
                {/* <Image source={require('../images/meall.png')} style={{width: 40, height: 40}} /> */}
                  <Icon color="white" name="map-marker" type='font-awesome' size={65} />
                  <Text style={styles.text}>Tracking</Text>
                </TouchableOpacity>

              </View>
            </View>

            <View style={styles.downitems}>
              <View style={styles.downinner}>

                <TouchableOpacity onPress={() => navigate('Booking')}>

                  <Icon color="white" name="ticket" type='font-awesome' size={65} />
                  <Text style={styles.text}>Booking</Text>

                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.downitems}>
              <View style={styles.downinner}>

                <TouchableOpacity onPress={() => navigate('Test',{id:this.state.routeId})}>
                <Image source={require('../images/meal.png')} style={{width: 70, height: 70}} /> 
                  {/* <Icon color="white" name="clock-o" type='font-awesome' size={65} /> */}
                  <Text style={styles.text}>Food Order</Text>

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