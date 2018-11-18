

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight, ListItem, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid,TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';

import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';
import pic from '../images/user.png';



export default class App extends Component {

  constructor() {
    super();
    this.state = { currentUser: null, dataArray: [], loading: false, refreshing: false, user: true,
    name:'',
    cnic:'',trp_id:'',
    phone:'',imgurl:'',//img:{uri:'../images/128.jpg'},
    addr:'',//img:'',
    img:require('../images/128.jpg')
   }
    //tp_i:this.props.navigation.state.params.tp};
    
    this.ref = firebase.firestore().collection('passengers');
    this.reff  = firebase.firestore().collection('ticketreservedpassengers');


  }
  
  static navigationOptions = {
    header: null
  }
componentDidMount(){
  const {uid} =firebase.auth().currentUser;
  this.reff.where('userid','==',uid).limit(1).onSnapshot(q=>{
    q.forEach(doc=>{
     this.setState({ trp_id :doc.id})
    })
    console.log(this.state.trp_id);
  })
}
componentWillUnmount(){
 this.ref=null;
 this.reff=null;
}







profile =()=>{
  const {uid} =firebase.auth().currentUser;
  console.log(uid);
   this.ref.doc(uid).onSnapshot(query=>{
    console.log(query);
    this.setState({
        name:query.data().name,
        cnic:query.data().cnic,
        phone:query.data().contact,
        addr:query.data().address,
        imgurl:query.data().img,
        
    });
    console.log(this.state.imgurl);
    if (this.state.imgurl != ''){
      this.setState({user:false});
    
    
    const url= {uri:this.state.imgurl};
    this.setState({img:url});

    this.setState({loading:false});
    }
})
  this.popupDialog.show();
}








profilepic=()=>{
  const {uid} =firebase.auth().currentUser;
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      }
     }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      
      const source ={uri:response.uri};
       // const source =require('response.uri')
      if (response.didCancel) {
       // this.setState({img:require('../images/128.jpg')});
      }
     // img =response.uri;
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   // Same code as in above section!
    //const source = { uri: response.uri };
   else {  
     this.setState({
    //   // img:'content://media/external/images/media/18338'
      img :source
     }) ;
    this.ref.doc(uid).update({
      img:response.uri
    });
    // this.reff.doc(this.state.trp_id)
    
    // .update({
    //   img:response.uri
    // });
    
  }

  })
    
      
    

  }













  render() {
    const { navigate } = this.props.navigation
    // const {uid} =firebase.auth().currentUser;
    return (
      this.state.loading
        ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator color="#330066" animating></ActivityIndicator>
          <Text>Loading.....</Text>
        </View>
        :
        <View style={styles.container}>
        <View style={styles.corusel}>

          {/* <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/10/10/05/04/locomotive-60539_640.jpg' }} style={{ width: '100%', height: '100%', position: 'absolute' }} /> */}
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/10/27/10/27/subway-2893846__340.jpg' }} style={{ width: '100%', height: '100%', position: 'absolute' }} />

         

          <TouchableOpacity style={styles.pro} onPress={ ()=>this.profile()}>
            
            <Icon color="white"  name="user" type='entypo' size={75} />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>



          <TouchableOpacity style={styles.touch} onPress={() => navigate('Timings')}>
            
          <Icon color="white" name="clock-o" type='font-awesome' size={75} />
            <Text style={styles.text}>Timings</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touch} onPress={() => navigate('Booking')}>
           
          <Icon color="white" name="ticket" type='font-awesome' size={75} />
            <Text style={styles.text}>Booking</Text>
          </TouchableOpacity>

           <TouchableOpacity style={styles.touch} onPress={() => navigate('FoodOrder')}>
           
           <Icon color="white" name="ticket" type='font-awesome' size={75} />
             <Text style={styles.text}>Ticket</Text>
           </TouchableOpacity>


         


      


                 <PopupDialog 
                width={0.8}
                height={0.8}
                overlayOpacity={0.5}
                dialogAnimation={new ScaleAnimation({
                toValue: 0, // optional
                useNativeDriver: true, // optional
                }
                )
                }

            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
            >

            <View style={{flex:1}}>
            <Text style={{fontSize:25,color:'red',backgroundColor:'#7b1fa2',marginBottom:10,textAlign:'center'}}>Profile</Text>
          
<View style={{height:150,flexDirection:"row",justifyContent:'center'}}>
           
           <TouchableWithoutFeedback onPress={this.profilepic}>
           
           {this.state.user
           ?
            <Image source={pic}
                   style={{height:150,width:150, position:'absolute',borderRadius:100}} />
           :
           <Image source={this.state.img}
                   style={{height:150,width:150, position:'absolute',borderRadius:100}} />
           }


                

            </TouchableWithoutFeedback>  
            
</View>


<View style={{backgroundColor:'#cfd8dc'}}>
           
            <View style={styles.list}>
     
            

        <Icon  color="purple" name="user" type='entypo' size={25} />
        <Text style={{fontSize:20,color:'black',marginLeft:3,marginBottom:5,textAlign:'center'}}>{this.state.name}</Text>
            </View>
     

</View>
            <View style={{ backgroundColor: 'black',height:2,width:'100%' }} />

 <View style={{backgroundColor:'#cfd8dc'}}>

            <View style={styles.list}>

        <Icon  color="purple" name="v-card" type='entypo' size={25} />
        <Text style={{fontSize:20,color:'black',marginLeft:6,marginBottom:5,textAlign:'center'}}>{this.state.cnic}</Text>
            </View>

</View>
 <View style={{ backgroundColor: 'black',height:2,width:'100%' }} />

 <View style={{backgroundColor:'#cfd8dc'}}>
            <View style={styles.list}>

        <Icon  color="purple" name="phone" type='entypo' size={25} />
        <Text style={{fontSize:20,color:'black',marginLeft:3,marginBottom:5,textAlign:'center'}}> {this.state.phone}</Text>
            </View>
</View>
             <View style={{ backgroundColor: 'black',height:2,width:'100%' }} />

 <View style={{backgroundColor:'#cfd8dc'}}>
            <View style={styles.list}>

        <Icon  color="purple" name="address-card" type='font-awesome' size={25} />
        <Text style={{fontSize:20,color:'black',marginLeft:5,marginBottom:5,textAlign:'center'}}>{this.state.addr}</Text>
            </View>
</View>
     
</View>
        
          </PopupDialog>





            </View>
 
      



      </View>














    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
  // backgroundColor: 'gray',
  },
  corusel: {
   // backgroundColor: 'purple',
    height: '100%', flexDirection: 'row',
    flexWrap: 'wrap',
     alignContent:'center',
     alignItems: 'center',
     justifyContent:'center'
  },
  list: {
    flexDirection: 'row',
   
  //  justifyContent: 'center',
    flexWrap: 'wrap',
    padding:20,
  },
  touch :{
    height:185,
    width:185,
    backgroundColor:'purple',
    opacity: 0.8,
   // backgroundColor:'transparent',
    borderColor: 'purple',
    margin: 5,
    justifyContent:'center',
   alignContent:'center',
    alignItems: 'center',
  },
  pro :{
      height:200,
      width:200,
      borderRadius:100,
      backgroundColor:'purple',
      opacity:0.8,
      alignItems: 'center',
      alignContent: 'center',
      justifyContent:'center'
  },
  down: {
    //height: '25%',
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 10,
    marginRight: 10,
    padding: 20


  },
  downitems: {
    width: '23%',
    height: '23%',
    padding: 2, alignContent: 'center', alignItems: 'center', marginTop: 20, margin: 20,
    backgroundColor: '#292929',
  },
  downinner: {
    flex: 1,
    backgroundColor: '#292929',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',

  }



})