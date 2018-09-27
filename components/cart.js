

import React, { Component } from 'react';
import { Button, Text, TextInput, ScrollView, ToastAndroid,TouchableOpacity, StyleSheet, StatusBar, View } from 'react-native';
import firebase from 'react-native-firebase';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';

import {r_id} from './login';
import {trp_id} from './login';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalamount: this.props.navigation.state.params.amount,
            orderlist: this.props.navigation.state.params.orders
        }
        this.ref = firebase.firestore().collection('foodorder'); 
       
    }
    order=()=>{
        const { navigate } = this.props.navigation;
       
         this.ref.add({
            ticketreservedpassengers : trp_id ,
            route_id : r_id,
            order :this.state.orderlist,
            total:this.state.totalamount
          
      });
      ToastAndroid.show('Order sent successfully',ToastAndroid.SHORT);
      navigate('Home');
    }




    static navigationOptions = {
        header: null
    }


   
       






    render() {

        const {navigate} =this.props.navigation;
      

        return (

            <View style={styles.container}>
                <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center' }}> Order List </Text>
                
                <ScrollView  style={{ height: 50, backgroundColor: 'powderblue'}}>
                
                    <List   containerStyle={{ marginBottom: 20 }}>
                 {
                     this.state.orderlist.map((l) => (
                         <ListItem  
                             hideChevron={true}      
                             badge={{value:l.quant}}
                             roundAvatar
                             avatar={{ uri: l.image }}
                             subtitle={'Price '+l.price }
                             key={l.name}
                             title={l.name}
                         />
                     ))
                }
             </List>
                </ScrollView>
                    <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center' }}>  Total bill  {this.state.totalamount}</Text>
      <View style={{alignContent:'center',flexDirection:'row',justifyContent:"center",backgroundColor:'skyblue'}}>
        
        <Button title="Confirm" color="skyblue"
                onPress={this.order}/>
        <Icon  color="green" name="check-circle" type='font-awesome' size={25} />         
      </View> 

             
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
         backgroundColor: '#455a64'
    },
    list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent:'center',
        flexWrap: 'wrap',
        paddingBottom: 20,
        
      },
     

});
