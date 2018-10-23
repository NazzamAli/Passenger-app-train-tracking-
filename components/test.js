

import React, { Component } from 'react';
import {
  
  Text, TouchableOpacity, FlatList,ScrollView,TextInput, ToastAndroid,TouchableHighlight,ListItem,RefreshControl,Image,
  View, StatusBar, FlatListItem,BackHandler,StyleSheet,style,ActivityIndicator,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
import cart from '../components/cart';
import Spinner  from 'react-native-spinkit';

a=[];
export default class App extends Component {

  constructor(props) {
    super(props);
      this.state={foodlist: [] ,count:0,quantity:0,text: '',data:[],cartdata:[],totalBill:0,names:[],array:[],loading:true,
      routeId:this.props.navigation.state.params.id,}
     
      this.ref = firebase.firestore().collection('route');
      this.refer = firebase.firestore().collection('fooditems');
}

  componentDidMount() {
    // BackHandler.addEventListener('hardwareBackPress', function() {
    //   // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
    //   // Typically you would use the navigator here to go to the last state.
    
     
    //     this.goBack();
    //     return true;
     
     
    // });
    this.ref.doc(this.state.routeId).onSnapshot(query=>{
     
      const names=query.data().food;
       
     
       this.setState({names:names});
      

       this.GetFoodItems();
    });
   
    
  }

  GetFoodItems() {
  
    var items =[];
   for (const i=0; i < this.state.names.length;i++){
     
  this.refer.doc(this.state.names[i]).onSnapshot(query=>{
   
    items.push({
      name : query.data().name,
      img: query.data().img,
      price : query.data().price,
    });
    this.setState({ foodlist: items });
    this.state.loading =false;
  });

   }

  

  }

  cart(name,price,img){
    
  
    this.props.navigation.navigate('AddItems',{name:name,price:price,image:img,b:this.bill.bind(this),arr:this.state.array});
  }
emptycart=()=>{
  console.log('empt is called');
  a.length = 0;
 
  this.setState({cartdata:[]});
}

Cart=()=>{
  const {navigate} =this.props.navigation;
  if (this.state.totalBill !==0) {
 
  navigate('Cart',{amount:this.state.totalBill,orders:this.state.cartdata,empt:this.emptycart.bind(this)})

  }
  else {
    ToastAndroid.show('No item is in cart',ToastAndroid.SHORT);
  }
}


   
  bill(total,orderr){

    orderr.forEach(order => {
    
      a.push({
        name:order.na,
        price:order.pr,
        image:order.im,
        quant:order.qu
      });
    });

    





    this.setState({cartdata:a});

    
     this.setState({totalBill:this.state.totalBill + parseInt(total)});
     
    
  }
  



  static navigationOptions = {
    header: null
  }

  render() {
    
    const d= this.state.foodlist.map((num,index)=>{

       return <Card key={index}  containerStyle={{width:'40%'}} 
       
        image={{uri:num.img}}>
          {/* <Image source={{uri: num.img}}
                  style={{width: '50%', height: '50%',position:'absolute'}}   /> */}
           <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.name}</Text>
           <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.price} Rs</Text>
           
           <View style={styles.list}>
            <View >
          <Button title="Place Order" onPress={()=>{this.cart(num.name,num.price,num.img)}} buttonStyle={styles.btn}/>
          {/* <Icon  color="blue" name="minus" type='font-awesome' size={20} onPress={()=>{this.dec(num.name,num.price,index)}} />
          
          <Text>{this.state.quantity} {index}</Text>
         
          <Icon  color="blue" name="plus" type='font-awesome' size={20} onPress={()=>{this.inc(num.name,num.price,index)}} />
          */}</View> 
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
    <Text style={{fontSize:25,color:'white',marginTop:10,marginBottom:5,textAlign:'center'}}>Total  {this.state.totalBill}</Text>
     
    <ScrollView style={styles.contentContainer}>
        <View style={styles.list}>
        {d}
        </View>
        
         
    </ScrollView>
      <View style={{alignContent:'center',flexDirection:'row',justifyContent:"center",backgroundColor:'skyblue'}}>
        
        <Button title=" View Cart" color="purple"  buttonStyle={styles.cartbtn}   titleStyle={styles.ts}
                icon={{
                  name: 'shopping-cart',
                  size: 25,
                  color: 'yellow'
                }}
                textStyle={{fontSize:22}}
                onPress={this.Cart}

                />
        
   
      </View>         
           
         
      
    </View>}
    </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1c313a',


    },
    contentContainer: {
        //paddingVertical: 50,
       
        backgroundColor: 'white'
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
    cartbtn :{
    
        backgroundColor: 'transparent',
        width: 300,
      height: 45,
    
    },
    btn: {
      backgroundColor: "rgba(92, 99,216, 1)",
      width: 300,
      height: 45,
      borderColor: "transparent",
      borderWidth: 0,
      borderRadius: 5
    },
    ts :{
      fontWeight: "900" ,
      fontSize:200
                
    }
  
  });