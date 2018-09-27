

import React, { Component } from 'react';
import {Button,Text,TextInput,TouchableOpacity,StyleSheet,StatusBar, View} from 'react-native';
import  firebase from 'react-native-firebase';
import { Toast } from 'native-base';

 const trp_id='';
 export {trp_id};
 const r_id='';
 export {r_id} ;
 export default class App extends Component {

    constructor(props){
      super(props);
      this.state ={
        email : '',
        pass : '',
        t_id : '',
        routeId: '',
      }
      this.ref = firebase.firestore().collection('ticketreservedpassengers');
      
    }





    static navigationOptions = {
        header :null
      }
  
     onLogin=()=>{
     console.log(this.state.email,this.state.pass);
    //  this.props.navigation.navigate('Home');
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.pass)
      .then((user)=>{
        //console.log(this.state.email+""+this.state.pass);
        this.setState({email:'',pass:''});
        this.props.navigation.navigate('Home1');
      }).catch((error)=>{
        alert(error);
        console.log(error);
      });
    }


    track=()=>{
       
    
      this.ref.where('tracking_id','==',this.state.t_id).onSnapshot(query=>{

        if (query.size!=0){

        query.forEach(doc => {
       
       
         trp_id=doc.id;
         r_id=doc.data().route_id;
       
        this.setState({routeId : doc.data().route_id});
      
   
    });
    this.props.navigation.navigate('Home',{id:this.state.routeId});
  }
        else {
          ToastAndroid.show('Invalid Tracking Id', ToastAndroid.SHORT);
         
          
        }

         
      });


    }








  render() {
    return (
       
        <View style={styles.container}>
        <StatusBar
           backgroundColor="#1c313a"
           barStyle="light-content"
         />
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType="email-address"
                onChangeText = {
                  (text) =>{
                    this.setState({email:text});
                  }
                }
                />
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                onChangeText = {
                  (text) =>{
                    this.setState({pass:text});
                  }
                }
                />  
            <TouchableOpacity style={styles.button}
            onPress={this.onLogin}>
            
            <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>   
            <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Not a member?</Text>
					<TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
          <Text style={styles.signupButton}> Register</Text></TouchableOpacity>
                
        </View>
        <View>

      <TextInput  style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Tracking Id"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                onChangeText = {
                  (text) =>{
                    this.setState({t_id:text});
                  }
                }
                /> 
                <TouchableOpacity onPress={this.track}><Text  style={{textAlign :'center'}}> Submit</Text></TouchableOpacity>
      </View>
     </View>
    );
  }
}



const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#455a64'
      },
     
      inputBox: {
        width:300,
        backgroundColor:'rgba(255, 255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal:16,
        fontSize:16,
        color:'#ffffff',
        marginVertical: 10
      },
      button: {
        width:300,
        backgroundColor:'#1c313a',
         borderRadius: 25,
          marginVertical: 10,
          paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
      },
      signupTextCont : {
        //flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical:16,
      flexDirection:'row'
    },
      signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
  
});
