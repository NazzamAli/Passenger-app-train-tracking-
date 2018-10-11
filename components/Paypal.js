
import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,ScrollView,WebView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker, Item } from 'native-base';
import {getDistance} from 'geolib';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            totalseats: this.props.navigation.state.params.total,
           
            myseats:this.props.navigation.state.params.myseats,
            fare : this.props.navigation.state.params.fare,
            t_id:this.props.navigation.state.params.t_id,
            r_id :this.props.navigation.state.params.route_id,link:'',id:'',
            Address:'',Cnic:'',ContactNo:'',Penalties:[],date:'',name:'',panlitiespayment:[],route_id:'',seats:[],
            status:'',tracking_id:'',train_id:'',userid:'',email:'',
            slat: this.props.navigation.state.params.slat,
            slng: this.props.navigation.state.params.slng,
            dlat: this.props.navigation.state.params.dlat,
            dlng: this.props.navigation.state.params.dlng,


        };
       
        console.log(this.state.t_id);
        this.reg = firebase.firestore().collection('ticketreservedpassengers');
        
        this.pass= firebase.firestore().collection('passengers');
        const {uid} =firebase.auth().currentUser;
       this.pass.doc(uid).onSnapshot(query=>{
            console.log(query.data());
            this.setState({
                Address:query.data().address,
                Cnic:query.data().cnic,
                ContactNo:query.data().contact,
                // Penalties:'',
                // date:'',
                name:query.data().name,
               // panlitiespayment:'',
                route_id:this.state.r_id,
                seats:this.state.myseats,
                // status:'',
                // tracking_id:'',
                // train_id:'',
                email:query.data().email,
                userid:query.data().userid



            });


            console.log(this.state.name);
           // this.add();
        });




        
        
    }

    componentDidMount(){

        this.getMoviesFromApi(); 
        const {uid} =firebase.auth().currentUser;
        // this.pass.doc(uid).onSnapshot(query=>{
        //     console.log(query.data());
        //     this.setState({
        //         Address:query.data().address,
        //         Cnic:query.data().cnic,
        //         ContactNo:query.data().contact,
        //         // Penalties:'',
        //         // date:'',
        //         name:query.data().name,
        //        // panlitiespayment:'',
        //         route_id:this.state.r_id,
        //         seats:this.state.myseats,
        //         // status:'',
        //         // tracking_id:'',
        //         // train_id:'',
        //         email:query.data().email,
        //         userid:query.data().userid



        //     });


        //     console.log(this.state.name);
        //    // this.add();
        // });
       // this.add();
       
    }

   
    add=()=>{

        const ran =Math.random().toString(36).substring(2, 15);
        this.reg.add({

            Address:this.state.Address,
            Cnic:this.state.Cnic,
            ContactNo:this.state.ContactNo,
            Penalties:this.state.Penalties,
            date:'2018-10-11',
            name:this.state.name,
            panlitiespayment:this.state.panlitiespayment,
            route_id:this.state.route_id,
            seats:this.state.seats,
            status:'',
            tracking_id:ran,
            train_id:this.state.t_id,
            email:this.state.email,
            userid:this.state.userid,
            slat:this.state.slat,
            slng:this.state.slng,
            dlat:this.state.dlat,
            dlng:this.state.dlng





        })

        alert('success');
    }

    async getMoviesFromApi() {
        const d ="22.00";
        const ran =Math.random().toString(36).substring(2, 15);
        const n =this.state.name;
        try {
          let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
            method: 'POST',
            headers: {
                'Accept' :'application/json',
              'Authorization': 'Bearer A21AAHnlYdflABoLWnMxhauvC70m6hq2ZFfyEdPkyo7eTiBV3g_8aM-K_Q4yd3yuLA4-rHO4WMnXtlg59FPIUuLE1lPS9Nz2w',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                
                    "intent": "sale",
                    "payer": {
                      "payment_method": "paypal"
                    },
                    "transactions": [
                      {
                        "amount": {
                          "total": d,
                          "currency": "USD",
                          "details": {
                            "subtotal": d,
                            "tax": "0.00",
                            "shipping": "0.00",
                            "handling_fee": "0.00",
                            "shipping_discount": "0.00",
                            "insurance": "0.00"
                          }
                        },
                        "description": "The payment for seats.",
                        "custom": "EBAY_EMS_94210243335",
                        "invoice_number": ran,
                        "payment_options": {
                          "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                        },
                        "soft_descriptor": "ECHI4852",
                        "item_list": {
                          "items": [
                            {
                              "name": "your seats",
                              "description": "door seat.",
                              "quantity": "1",
                              "price": d,
                              "tax": "0.00",
                              "sku": "product2",
                              "currency": "USD"
                            }
                            
                          ],
                          "shipping_address": {
                            "recipient_name": "Ali HAider",
                            "line1": "9th Floor",
                            "line2": "Unit #32",
                            "city": "San Jose",
                            "country_code": "US",
                            "postal_code": "95121",
                            "phone": "011862217845678",
                            "state": "CA"
                          }
                        }
                      }
                    ],
                    "note_to_payer": "Contact us for any questions on your order.",
                    "redirect_urls": {
                      "return_url": "https://example.com/return",
                      "cancel_url": "https://example.com/cancel"
                    }
                  
                  
            }),
          })
          
         
          let responseJson = await response.json();
          console.log(responseJson);
          this.setState({link:responseJson.links[1].href,id:responseJson.id});
          console.log(this.state.link);
          console.log(this.state.id);
          return responseJson.movies;
        } catch (error) {
          console.error(error);
        }
      }



      async payment(payer){
   
        try {
          let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment/'+this.state.id+'/execute', {
            method: 'POST',
            headers: {
                'Accept' :'application/json',
              'Authorization': 'Bearer A21AAHnlYdflABoLWnMxhauvC70m6hq2ZFfyEdPkyo7eTiBV3g_8aM-K_Q4yd3yuLA4-rHO4WMnXtlg59FPIUuLE1lPS9Nz2w',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
              
                "payer_id": payer
              
               
          })
        })
          
          let responseJson = await response.json();
          console.log(responseJson);
         
          // return responseJson.movies;
        } catch (error) {
          console.error(error);
        }
        console.log("below is add");
        this.add();
      }
  
      


      _onNavigationStateChange =(webstate)=> {
     
        console.log(webstate.url);
        var urlParams = new URLSearchParams(webstate.url);
        const payer_id = urlParams.get('PayerID');
        console.log(payer_id);
       
        if (payer_id !=null){
         this.payment(payer_id);
   
   
   
   
   
        }
       }  
    
    render() {
     
        

const {uid} =firebase.auth().currentUser;
const { navigate } = this.props.navigation;
const { params } = this.props.navigation;
return (
    
    <WebView
    source={{uri: this.state.link}}
      style={{marginTop: 20}}
      onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          javaScriptEnabled = {true}
          domStorageEnabled = {true}
          injectedJavaScript = {this.state.cookie}
          startInLoadingState={false}
         onLoadEnd={this.home}
         BackAndroid={true}
         BackHandler={true}
/>

          
       
    
    )
}

}    



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'gray',


    },
    contentContainer: {
        //paddingVertical: 50,
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