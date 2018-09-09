

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList,ScrollView,TextInput, TouchableHighlight,ListItem,RefreshControl,Image,
  View, StatusBar, FlatListItem,BackHandler,StyleSheet,style,ActivityIndicator,ToastAndroid
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Icon } from 'react-native-elements'




export default class App extends Component {
 
  constructor() {
    super();
      this.state={foodlist: [] ,count:0,quantity:0,text: '',data:[],cartdata:[]}
      this.ref = firebase.firestore().collection('fooditems');
}

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
      // Typically you would use the navigator here to go to the last state.
    
     
        this.goBack();
        return true;
     
     
    });
    console.log("Compounutn monte");
    this.GetFoodItems();
  }

  GetFoodItems() {
    console.log("get food function");
    var names = [];
    this.ref.onSnapshot(query => {
      console.log(query);
      query.forEach(doc => {
        names.push ({
            name :doc.data().name,
            price:doc.data().price,
            img :doc.data().img
      });
        console.log("lodssd" + doc.data().name)
      });
      this.setState({ foodlist: names });

    });

  }
  incc(name, price, index){
  this.setState(prevState =>{
      quantity: this.state.quantity + 1
  });
  }
  inc(name,price,index){
      
    let arr=[];
      if(this.state.quantity<=0 || this.state.count<=0){
        this.setState({
          count:0,
          quantity:0
      });
      }
      else {
      this.setState({
          count:this.state.count + parseInt(price),
          quantity:this.state.quantity - 1
      });
      arr.push({
        n :name,
        p :price,
        q :this.state.text
      });
      this.setState({data:arr})
      console.log(arr);
    }
    console.log(arr);
    console.log(this.state.count);
    console.log(name);
  }
  dec(name,price,index){
    if(this.state.quantity<=0 || this.state.count<=0){
      this.setState({
        count:0,
        quantity:0
    });
    }
    else {
    this.setState({
        count:this.state.count - parseInt(price),
        quantity:this.state.quantity - 1
    });
  }
    console.log(this.state.count);
    console.log(name);
  }  

  cart(name,price,img){
    console.log("cart is called" +img);
    //this.props.navigation.navigate('Home');
    this.props.navigation.navigate('AddItems',{name:name,price:price,image:img});
  }

  



  static navigationOptions = {
    header: null
  }

  render() {
    
    const d= this.state.foodlist.map((num,index)=>{

       return <Card key={num.name}  containerStyle={{width:'40%'}} 
       
        image={{uri:num.img}}>
          {/* <Image source={{uri: num.img}}
                  style={{width: '50%', height: '50%',position:'absolute'}}   /> */}
           <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.name}</Text>
           <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.price} Rs</Text>
           
           <View style={styles.list}>
            <View >
          <Button title="Place Order" onPress={()=>{this.cart(num.name,num.price,num.img)}}/>
          {/* <Icon  color="blue" name="minus" type='font-awesome' size={20} onPress={()=>{this.dec(num.name,num.price,index)}} />
          
          <Text>{this.state.quantity} {index}</Text>
         
          <Icon  color="blue" name="plus" type='font-awesome' size={20} onPress={()=>{this.inc(num.name,num.price,index)}} />
          */}</View> 
          </View>  
            
        </Card>
    });
  






    return (
    <View style={styles.container}>
    <Text style={{fontSize:25,color:'purple',marginBottom:5,textAlign:'center'}}>Total  {this.state.count}</Text>
     
    <ScrollView style={styles.contentContainer}>
    <View style={styles.list}>
        {d}
        </View>
    </ScrollView>
    
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
    }
  
  });