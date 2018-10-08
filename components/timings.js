

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ListItem,RefreshControl,
  View, StatusBar, FlatListItem,StyleSheet,style,ActivityIndicator,ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';

import { Card, Icon } from 'react-native-elements'



export default class App extends Component {
 
  constructor() {
    super();
     this.state = { dataArray : [] , loading : true ,refreshing:false};
     this.ref = firebase.firestore().collection('trainroutes');
    
 
}
//   rou=({item})=>{
//     ToastAndroid.show(item,ToastAndroid.SHORT);
    
    
//     this.props.navigation.navigate('home1',{message:item});
//   }
  componentDidMount() {
    this.GetData();
    
  }
  GetData() {
    var names=[];
    this.ref.onSnapshot(query => {
      query.forEach(doc => {
        names.push(doc.data().name);
      });
      this.setState({dataArray : names,loading:false});
     
    });
     
  }
  _onResfresh(){
      this.setState({refreshing:true});
      this.setState({dataArray : []});
      this.GetData();
        this.setState({refreshing:false});
      

  }
  renderItem=({item})=>{
    var {navigate}=this.props.navigation
      return (
       <TouchableOpacity onPress={()=>navigate('Stations',{trainName:item})}>
      
        <Text style={{fontSize:25,marginBottom:10,textAlign:'center'}}>
          {item}
        </Text>
        </TouchableOpacity>
      );
  }

  renderSeparator=()=>{
    return(
      <View
      style={{
        height:1,
        width:'100%',
        backgroundColor:"#CED0CE",
        //marginLeft:"14%"
      }}

      />
    );
  };

  static navigationOptions = {
    header: null
  }

  render() {
   
    return (
     this.state.loading
     ?
      <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator  color="#330066" animating></ActivityIndicator>
      </View>
     :
     <View  style={
        {  flex : 1,
          
        }
      }
      >
      <Text style={{fontSize:28,backgroundColor:'purple',textAlign:'center',marginBottom:10}}>Trains</Text>
      <FlatList 
        data={this.state.dataArray}
        
        renderItem={this.renderItem} 
        
        
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={this.renderSeparator}
        refreshControl={
          <RefreshControl
          refreshing ={this.state.refreshing}
          onRefresh={this._onResfresh.bind(this)}
          />
        }

      />
      
      </View>
    
    );
  }
}