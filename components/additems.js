

import React, { Component } from 'react';
import {
  Button,Image,
  Text, TouchableOpacity, FlatList,BackHandler,
  BackHandlerBackHandler ,TouchableHighlight,ListItem,RefreshControl,
  View, StatusBar, FlatListItem,StyleSheet,style,ActivityIndicator,ToastAndroid,BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card } from 'react-native-elements'
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
     
 
}

   
  AddCart(n,p,i,q){
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
  inc(quant,pri){
    
    if(this.state.quantity<0 || this.state.count<0){
      this.setState({
        count:0,
        quantity:0
    });}
    else{
    this.setState({quantity:quant + 1,total:this.state.total + parseInt(pri)});
    }
  
}
  dec(quant,pri){
     
    if(this.state.quantity<=0 || this.state.count<=0){
      this.setState({
        total:0,
        quantity:0
    });}
    else {
    this.setState({quantity:quant - 1,total:this.state.total - parseInt(pri)});
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
                style={{width: 400, height: 400}} />
            <Text>Price  {this.state.price}  Rs.</Text>    
            <Text style={{fontSize:18,color :'skyblue' ,marginBottom:10,textAlign:'center'}}>Quantity</Text>
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
                <Text style={{paddingTop:'5%'}}> Total  {this.state.total}</Text>

                <View >
                
                <Button title="Add to cart" 
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
      backgroundColor: 'gray',


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
    }
  
  });