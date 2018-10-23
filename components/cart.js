

import React, { Component } from 'react';
import { Text, TextInput, ScrollView, ToastAndroid,TouchableOpacity, StyleSheet, StatusBar, View } from 'react-native';
import firebase from 'react-native-firebase';
import { List, ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';
import { Button } from 'react-native-elements';
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
            total:this.state.totalamount,
            status:''
          
      });
      ToastAndroid.show('Order sent successfully',ToastAndroid.SHORT);
        
        const {params} = this.props.navigation.state;
        params.empt();
      navigate('Home');
     
    }




    static navigationOptions = {
        header: null
    }


   
       






    render() {

        const {navigate} =this.props.navigation;
      

        return (

            <View style={styles.container}>
                <Text style={{ fontSize: 25, color: 'white',marginTop:10, marginBottom: 10, textAlign: 'center' }}> Order List </Text>
                
                <ScrollView  style={{ height: 50, backgroundColor: '#eeeeee'}}>
                
                    <List   containerStyle={{ marginBottom: 20 }}>
                 {
                     this.state.orderlist.map((l,i) => (
                         <ListItem  
                         key={i}
                            titleStyle={{fontSize:20}}
                             hideChevron={true}      
                             badge={{value:l.quant}}
                             roundAvatar
                             avatar={{ uri: l.image }}
                             
                            
                             subtitle={'Price '+l.price }
                             subtitleStyle={{fontSize:10}}
                             key={l.name}
                             title={l.name}
                             containerStyle={{height:70,justifyContent:'center'}}
                         />
                     ))
                }
             </List>
                </ScrollView>
                    <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center' }}>  Total bill  {this.state.totalamount}</Text>
      <View style={{alignContent:'center',flexDirection:'row',justifyContent:"center",backgroundColor:'skyblue'}}>
        
        <Button title="Confirm" color="purple"  buttonStyle={styles.cartbtn}  icon={{
                  
                  name: 'check-circle',
                  size: 25,
                  color: 'green'
                }}
                titleStyle={{ fontWeight: "700",fontSize:10 }}
                textStyle={{fontSize:22}}
                onPress={this.order}/>
        {/* <Icon  color="green" name="check-circle" type='font-awesome' size={25} />                  */}
        {/* <Button title=" View Cart" color="purple"  buttonStyle={styles.cartbtn}   titleStyle={styles.ts}
                icon={{
                  name: 'shopping-cart',
                  size: 25,
                  color: 'yellow'
                }}
                onPress={()=>navigate('Cart',{amount:this.state.totalBill,orders:this.state.cartdata})}/> */}
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
      cartbtn :{
    
        backgroundColor: 'transparent',
        width: 300,
      height: 45,
    
    },
     

});
