

import React, { Component } from 'react';
import {Button,Text,TextInput,TouchableOpacity,StyleSheet,StatusBar, View} from 'react-native';
import  firebase from 'react-native-firebase';




 export default class App extends Component {
    static state ={
      name :'',
      cnic :'',
      email : '',
      pass : ''
    }
    static navigationOptions = {
        header :null
      }
  
    onRegister = ()=> {
        console.log("Ahmed jahsu");
        //this.props.navigation.navigate('Login');
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email,this.state.pass)
        .then((user)=>{
          console.log("User data return "+user);
          
          this.add();
          // this.ref = firebase.firestore().collection('passengers').add({
          // name :this.state.name,
          // cnic :this.state.cnic,
          // email :this.state.email,
          // pass : this.state.pass,
          
         
          // })
          // .then((user)=>{
          //   alert("successfull added");
          //   add();
          //   this.setState({
          //     name: '',
          //     cnic: '',
          //     email: '',
          //     pass: ''
          // });
          // });
          // this.props.navigation.navigate('Login');
        }).catch((error)=>{
          
          console.log(error);
        });
      
        
    }

    add(){
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          console.log("We are authenticated now!");
          firebase.firestore().collection("passengers")
              .doc(firebase.auth().currentUser.uid).set({ name :this.state.name,
                cnic :this.state.cnic,
                email :this.state.email,
                pass : this.state.pass,
              userid:firebase.auth().currentUser.uid});
          alert("successfull added");
          this.props.navigation.navigate('Login');

      } else {
        alert("successfull added");
      }
      })
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
                placeholder="Full Name"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                onChangeText = {
                  (text) =>{
                    this.setState({name:text});
                  }  
                }            
            />
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="CNIC"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                onChangeText = {
                  (text) =>{
                    this.setState({cnic:text});
                  }    
                }            
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
            onPress={this.onRegister}>
            
            <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>   
            <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}><Text style={styles.signupButton}> Login</Text></TouchableOpacity>
				</View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
    container : {
        flexGrow: 1,
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
