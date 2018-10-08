

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ListItem,RefreshControl,ScrollView, 
  View, StatusBar, FlatListItem,StyleSheet,style,ActivityIndicator,ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';
import Spinner  from 'react-native-spinkit';
import { Card, Divider } from 'react-native-elements'



export default class App extends Component {
 
  constructor(props) {
    super(props);
     this.state = { trainroute_id:'', loading : true ,refreshing:false,station: [], stationData: [], 
     routeId:this.props.navigation.state.params.id
    };
     this.ref = firebase.firestore().collection('route');
     this.refer =firebase.firestore().collection('trainroutes');
    
 
}
//   rou=({item})=>{
//     ToastAndroid.show(item,ToastAndroid.SHORT);
    
    
//     this.props.navigation.navigate('home1',{message:item});
//   }
  componentDidMount() {
    this.ref.doc(this.state.routeId).onSnapshot(query=>{
       // console.log(query.data());
       
       
         this.setState({trainroute_id:query.data().trainroute_id});
         console.log(this.state.trainroute_id);
         this.GetData();
       //  this.GetFoodItems();
      });
    
    
  }
  GetData() {
    this.refer.doc(this.state.trainroute_id).onSnapshot(query=>{
       
          this.setState({station:query.data().stations});

          console.log(this.state.station);
  
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
      this.state.loading=false;
    }
    
  }
  
 
  render() {

        const d= this.state.stationData.map((y,index)=>{
    
          return <Card key={y.st_name}  containerStyle={{width:'80%'}} key={index}
            title = {`${y.st_name}`}
          //  image={{uri:num.img}}
          >
            <View style={styles.list}>
            <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Arrival</Text>
            <Divider style={{ backgroundColor: 'blue',height: 1 }} />
            <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{y.arrival}</Text>
            </View>
             
              <View style={styles.list}>
              <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Departure</Text>
              <Divider style={{ backgroundColor: 'blue' }} />
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