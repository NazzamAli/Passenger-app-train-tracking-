

import React, { Component } from 'react';
import { Button, Text, View, StatusBar,StyleSheet,ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

import { Card, Divider } from 'react-native-elements'
import Spinner  from 'react-native-spinkit';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { trainName: this.props.navigation.state.params.trainName, station: [], stationData: [] ,  loading:true,
    };
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
     this.state.loading=false;
  }



  static navigationOptions = {
    header: null
  }

  render() {

    const d= this.state.stationData.map((y,i)=>{

      return <Card key={y.st_name}  containerStyle={{width:'80%'}}  key={i}
        title = {`${y.st_name}`}
      //  image={{uri:num.img}}
      >
        <View style={styles.list}>
        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Arrival</Text>
      
        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{y.arrival}</Text>
        </View>
         
          <View style={styles.list}>
          <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Departure</Text>
          
          <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{y.departure} </Text>
          </View>
           
           
       </Card>
   });
 









    return (
      <View style={styles.container}>

      {this.state.loading
              ?
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
              <Spinner color={'red'} size={100} type={'Wave'}/>
              
              </View>
              :
      <View style={styles.container}>
        <Text style={{ fontSize: 25, marginBottom: 10, textAlign: 'center' }}>{this.state.trainName}</Text>
        <Text style={{
                  fontSize:20,
                  color:'blue',
                  textAlign:'center'
                }}>Stations</Text>
        <ScrollView style={styles.contentContainer}>
        <View style={{justifyContent:"center",alignContent:'center',alignItems:'center',marginBottom:50}}>
        {d}
        </View>
        </ScrollView>

     </View>}
     
       
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
      flex: 1,
      //backgroundColor: 'gray',


  },
  contentContainer: {
   // justifyContent:'center',
   // paddingVertical: 50,
   //paddingBottom: 50,
  // marginBottom:100,
    backgroundColor: 'white',
    
  },
  btnstyle :{
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 300,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 100
  },
  list: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingBottom: 20,
      alignContent: 'space-between',

  },
  listcontainer: {
      width: '80%',
      backgroundColor: 'blue'
  },
  Iconlist: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent: 'space-between',
  }

});