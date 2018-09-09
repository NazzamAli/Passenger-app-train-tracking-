

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
     arr=[];
     
  constructor(props) {
    super(props);
     this.state = {
         name:this.props.navigation.state.params.name,
         price:this.props.navigation.state.params.price,
         img:this.props.navigation.state.params.image,
         quantity:0,
         cart:[]
        };
    this.ref = firebase.firestore().collection('foodorder');    
     
 
}

  componentWillMount() { 
    BackHandler.addEventListener('hardwareBackPress',this.handleBackPress )
    }
  handleBackPress = () => {
    this.props.navigation.navigate('Home');
    //this.goBack(); // works best when the goBack is async
    return true;
  }
  
  AddCart(n,p,i,q,uid){
      console.log("addc aar");
      console.log(n+""+p+""+i+""+q+"ddg"+uid);
      this.ref.add({
          name:n,
          price:p,
          quantity:q,
          image:i,
          userid:uid
      });
      this.setState({
        // count:this.state.count + parseInt(price),
         quantity:this.state.quantity + 1
     });
    //  this.arr.push({
    //    na :n,
    //    pr :p,
    //    im :i,
    //    qu:q

    //  });
    //  this.setState({cart:this.arr});
    //  console.log(this.arr);
 

  }
  inc(quant){
    console.log("inc");
    this.setState({quantity:this.state.quantity + 1});

  
}
  dec(quant){
    console.log("dec");
    this.setState({quantity:this.state.quantity - 1});
  }









  
  static navigationOptions = {
    header: null
  }

  render() {
   
    const {uid} =firebase.auth().currentUser;
    return (
        
    <View style={styles.container}>
        <View style={styles.list}>
            <Card containerStyle={{width:'90%',backgroundColor:'white'}}> 

            <Image source={{uri: this.state.img}}
                style={{width: 400, height: 400}} />
            <Text style={{fontSize:18,color :'skyblue' ,marginBottom:10,textAlign:'center'}}>Quantity</Text>
                <View style={styles.Iconlist}>

                    <Icon  color="red" name="minus-square" type='font-awesome' size={25} onPress={()=>{this.dec(this.state.quantity)}} />
                    <Text>{this.state.quantity}</Text>
                    <Icon  color="green" name="plus-square" type='font-awesome' size={25} 
                            onPress={()=>{
                                this.inc(this.state.quantity)
                                }}/>
                    
                </View>
                <Button title="Add to cart" 
                onPress={()=>{
                    this.AddCart(this.state.name,this.state.price,this.state.img,this.state.quantity,uid)}}/>
                 <Text>
                     Hi {uid}!
                 </Text>
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