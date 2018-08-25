

import React, { Component } from 'react';
import { Button, Text, View, StatusBar } from 'react-native';
import firebase from 'react-native-firebase';




export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { trainName: this.props.navigation.state.params.trainName, station: [], stationData: [] };
    this.ref = firebase.firestore().collection('trainroutes');
  }
  componentWillMount() {
    this.GetStations();

  }
  GetStations() {
    console.log("station is called");

    var query = this.ref.where("name", "==", this.state.trainName).onSnapshot(query => {
      var stationData = [];
      query.forEach(doc => {
        stationData = doc.data().stations;
      });
      this.setState({ station: stationData });

      this.Data();
    });

  }
  Data() {
    var name = [];

    for (const i = 0; i < this.state.station.length; i++) {
      var documentReference = firebase.firestore().collection('cities').doc(this.state.station[i]);
      documentReference.get().then(documentSnapshot => {
        // check and do something with the data here.
        name.push({
          st_name: documentSnapshot.data().station_name,
          arrival: documentSnapshot.data().arrival,
          departure: documentSnapshot.data().departure
        });
        //console.log(documentSnapshot);
        // console.log(documentSnapshot.data().station_name+" "+documentSnapshot.data().arrival+" "+documentSnapshot.data().departure);
        console.log(name);
        this.setState({ stationData: name });
      });

    }
  }



  static navigationOptions = {
    header: null
  }

  render() {
    return (

      <View>
        <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center' }}>{this.state.trainName}</Text>
        <Text style={{
                  fontSize:20,
                  color:'blue',
                  textAlign:'center'
                }}>Stop List</Text>
        {
          this.state.stationData.map((y, index) => {
            return (
              <View>
              <Text key={index}>Station          Arrival        Departure</Text>
              <Text key={index}>{y.st_name}     {y.arrival}    {y.departure}</Text>
              <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />

                </View>);
          })
        }
        <Button title="click" onPress={this.Data.bind(this)} />
        <Button title="click" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}

