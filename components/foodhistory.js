
import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, RefreshControl, ScrollView, WebView, Modal,
    View, StatusBar, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { ListItem, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker, Item } from 'native-base';
import { getDistance } from 'geolib';
import { trp_id } from './login';

export default class Foodhistory extends Component {
    constructor(props) {
        super(props);
        this.state = { routeId: this.props.screenProps, array: [] };

       
        this.ref = firebase.firestore().collection('foodorder');
        this._mounted =true;
       
       
        
    }
    componentDidMount(){
        this.state.array.length =0 ;
        const data = [];
       
        this.ref.where('ticketreservedpassengers', '==', trp_id).where('route_id', '==', this.state.routeId).
            where('status', '==', 'served')
            .onSnapshot(query => {
                query.forEach(doc => {
                   // console.log(doc.data());
                    data.push(doc.data());
                   // this.state.array.push(doc.data());
                });
                if (this._mounted){
                this.setState({array:data});
                }
                console.log( this.state.array);
                data.length=0;

            })
    }
    componentWillUnmount() {
        console.log("tttttttt");
        this.ref=null;
      this._mounted = false;
     
      
    }
  
    




    render() {
        const d = this.state.array.map((l, i) => {
            return (
                <Card key={i} containerStyle={{ width: '90%' }}
                title={`Paid  ${l.total} Rs.`}
                titleStyle={{fontSize:20,color:'red'}}
                >
               
                   { l.order.map((u, i) => {
             return (
                     <ListItem
                        key={i}
                        roundAvatar
                        title={u.name}
                        titleStyle={{fontSize:18}}

                        subtitle={u.price}
                        subtitleStyle={{fontSize:12}}
                        avatar={{ uri: u.image }}
                        avatarStyle={{height:70,width:70,borderRadius:100}}
                        avatarContainerStyle={{width:70,height:70,borderBottomColor:'green',backgroundColor:'white'}}
                        badge={{value:u.quant}}
                        hideChevron={true}
                    />
      )}
                    ) }
              
              
              
                </Card>

            )
        })



        return (

            <View style={styles.container}>
            <Text style={{fontSize:25,color:'white',marginTop:10,marginBottom:5,textAlign:'center'}}>Recent Orders</Text>
    
            <ScrollView style={styles.contentContainer}>
         
                <View style={styles.list}>
                    {d}
                </View>


            </ScrollView>
            </View>


        )
    }

}  


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1c313a',


    },
    contentContainer: {
        //paddingVertical: 50,
       
        //backgroundColor: 'blue'
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