
import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,ScrollView,WebView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker, Item } from 'native-base';
import axios from 'axios';
export default class App extends Component {


  componentWillMount(){
  
  }
    constructor(props) {
        super(props);
        this.state = {
            
            array:[],co:true,data:[],link:'',id:''
        };
        
       const d ="40.00";
    
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
    
    componentDidMount () {
   this.getMoviesFromApi() 
    
    }
  async payment(payer){
   
    try {
      let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment/'+this.state.id+'/execute', {
        method: 'POST',
        headers: {
            'Accept' :'application/json',
          'Authorization': 'Bearer A21AAF_Pv7XiTWDmGJhtd9_HOZ0OZyl2-T5AuZEdTMsR5pUPbQLnRkodpc-QKMiD2t3NVe_eC6eCpD957B8Lz-TUYJaHbx4sQ',
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
    
  }
  

    async getMoviesFromApi() {
      const d ="23.00";
      try {
        let response = await fetch('https://api.sandbox.paypal.com/v1/payments/payment', {
          method: 'POST',
          headers: {
              'Accept' :'application/json',
            'Authorization': 'Bearer A21AAF_Pv7XiTWDmGJhtd9_HOZ0OZyl2-T5AuZEdTMsR5pUPbQLnRkodpc-QKMiD2t3NVe_eC6eCpD957B8Lz-TUYJaHbx4sQ',
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
                      "custom": "EBAY_EMS_90391421024435",
                      "invoice_number": "47717559673",
                      "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                      },
                      "soft_descriptor": "ECHI4855322",
                      "item_list": {
                        "items": [
                          {
                            "name": "2 seat",
                            "description": "door seat.",
                            "quantity": "1",
                            "price": d,
                            "tax": "0.00",
                            "sku": "product212",
                            "currency": "USD"
                          }
                          
                        ],
                        "shipping_address": {
                          "recipient_name": "ahmed",
                          "line1": "4th Floor",
                          "line2": "Unit #34",
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
    
    render() {
     
        

//const {uid} =firebase.auth().currentUser;
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

  

)}

}    
