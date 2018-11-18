

import React, { Component } from 'react';
import {
  Image,
  Text, TouchableOpacity, FlatList,BackHandler,
  BackHandlerBackHandler ,TouchableHighlight,ListItem,RefreshControl,
  View, StatusBar, FlatListItem,StyleSheet,style,ActivityIndicator,ToastAndroid,BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Button,Card } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';




export default class App extends Component {
    
  
  constructor(props) {
    super(props);
     this.state = {
         name:this.props.navigation.state.params.name,
         price:this.props.navigation.state.params.price,
         img:this.props.navigation.state.params.image,
         quantity:0,total:0,
         cart:[],
         array:this.props.navigation.state.params.arr
        };
    this.ref = firebase.firestore().collection('foodorder');    
     this._mounted =true;
 
}
componentWillUnmount(){

  this.ref =null ; 
  this._mounted =false;
}

   
  AddCart(n,p,i,q){
   if(this._mounted){
    if (q > 0) {
     
    const arr=[];
   
     arr.push({
       na :n,
       pr :p,
       im :i,
       qu:q
      });
     
      const {params} = this.props.navigation.state;
      params.b(this.state.total,arr);
      this.props.navigation.navigate('Test');
    }
    else {
      ToastAndroid.show("Please select the quatity",ToastAndroid.SHORT);
    }
  }
  }


  inc(quant,pri){
    if(this._mounted){
    if(this.state.quantity<0 || this.state.count<0){
      this.setState({
        count:0,
        quantity:0
    });}
    else{
    this.setState({quantity:quant + 1,total:this.state.total + parseInt(pri)});
    }
  }
}
  dec(quant,pri){
     if(this._mounted){
    if(this.state.quantity<=0 || this.state.count<=0){
      this.setState({
        total:0,
        quantity:0
    });}
    else {
    this.setState({quantity:quant - 1,total:this.state.total - parseInt(pri)});
    }
  }
  }







  
  static navigationOptions = {
    header: null
  }

  render() {
   
    //const {uid} =firebase.auth().currentUser;
    const {navigate} = this.props.navigation;
    const {params} = this.props.navigation;
    return (
        
    <View style={styles.container}>
        <View style={styles.list}>
            <Card containerStyle={{width:'90%',backgroundColor:'white'}}> 

            <Image source={{uri: this.state.img}}
                style={{width: 420, height: 350}} />
            <Text style={{fontSize:20}}>Price  {this.state.price}  Rs.</Text>    
            <Text style={{fontSize:18,backgroundColor:'#eeeeee',fontWeight:'700' ,marginBottom:10,textAlign:'center'}}>Quantity</Text>
                <View style={styles.Iconlist}>

                    <TouchableOpacity>
                    
                    <Icon  color="red" name="minus-square" type='font-awesome' size={25} onPress={()=>{this.dec(this.state.quantity,this.state.price)}} />
                   
                    </TouchableOpacity>
                   
                    <Text>{this.state.quantity}     </Text>
                    
                    <TouchableOpacity>
                    <Icon  color="green" name="plus-square" type='font-awesome' size={25} 
                            onPress={()=>{
                                this.inc(this.state.quantity,this.state.price)
                                }}/>
                    </TouchableOpacity>
                </View>
                <Text style={{paddingTop:'5%',marginBottom:5,fontSize:20}}> Total  {this.state.total}</Text>

                <View >
                
                <Button title="Add to cart"  buttonStyle={styles.btn}
                        textStyle={{fontSize:18}}
                        onPress={()=>{
                        this.AddCart(this.state.name,this.state.total,this.state.img,this.state.quantity)}}/>
                               
                </View>
                
            </Card>
        </View>
    </View>


    );
  }
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eeeeee',


    },
    contentContainer: {
        //paddingVertical: 50,
      },
    list: {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent:'center',
      flexWrap: 'wrap',
      paddingBottom: 20,
      
    },
    listcontainer :{
      width:'80%',
      backgroundColor:'blue'
    },
    Iconlist : {
      flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent:'space-between',
    },
    btn: {
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 300,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
     // borderRadius: 5
    },
  
  });