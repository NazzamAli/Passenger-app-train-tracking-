

import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight, ToolbarAndroid, ScrollView, ListItem, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, TouchableWithoutFeedback,style, ActivityIndicator, ToastAndroid
} from 'react-native';
import {Divider, Icon } from 'react-native-elements';
import PopupDialog, { ScaleAnimation } from 'react-native-popup-dialog';
import ImagePicker from 'react-native-image-picker';

import firebase from 'react-native-firebase';
// import Spinner  from 'react-native-spinkit';
import { trp_id } from './login';


const img ='https://facebook.github.io/react/logo-og.png' ;
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: null, dataArray: [], loading: false, refreshing: false,
       routeId:this.props.navigation.state.params.id,
       tp_i:this.props.navigation.state.params.tp,
       name:'',
       cnic:'',
       phone:'',imgurl:'',img:{uri:'../images/128.jpg'},
       addr:'',//img:require('../images/128.jpg')
    };
    console.log(this.state.tp_i);  

   

    // var message = 'https://facebook.github.io/react/logo-og.png';
    
    // var reff =firebase.storage().ref().child('/images'+ message);
    // reff.put(Blob);
    // firebase().storage().ref('images').putString(message).then(function(snapshot) {
    //   console.log('Uploaded a raw string!');
    // });
    // firebase.storage().ref('/images').putFile('https://facebook.github.io/react/logo-og.png').then(res=>{
    //   console.log(res);
    // })
     this.ref = firebase.firestore().collection('ticketreservedpassengers');


  }

  profile =()=>{
    this.ref.doc(this.state.tp_i).onSnapshot(query=>{
      console.log(query);
      this.setState({
          name:query.data().name,
          cnic:query.data().Cnic,
          phone:query.data().ContactNo,
          addr:query.data().Address,
          imgurl:query.data().img,
          
      });

      const url= {uri:this.state.imgurl};
      this.setState({img:url});

      this.setState({loading:false}); console.log(this.state.name);
      
})
    this.popupDialog.show();
  }

  profilepic=()=>{
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

      if (response.didCancel) {
       // this.setState({img:require('../images/128.jpg')});
      }
     // img =response.uri;
    // ImagePicker.launchImageLibrary(options, (response) => {
    //   // Same code as in above section!
    //const source = { uri: response.uri };
   else {  
    this.setState({
      // img:'content://media/external/images/media/18338'
      img :source
    }) ;
    this.ref.doc(this.state.tp_i).update({
      img:response.uri
    });
    
  }

  })
    
      
    

  }











  render() {
    const { navigate } = this.props.navigation
    // const {uid} =firebase.auth().currentUser;
  
    return (


      <View style={styles.container}>
        <View style={styles.corusel}>

          {/* <Image source={{ uri: 'https://cdn.pixabay.com/photo/2012/10/10/05/04/locomotive-60539_640.jpg' }} style={{ width: '100%', height: '100%', position: 'absolute' }} /> */}
          <Image source={{ uri: 'https://cdn.pixabay.com/photo/2017/10/27/10/27/subway-2893846__340.jpg' }} style={{ width: '100%', height: '100%', position: 'absolute' }} />

          <TouchableOpacity style={styles.touch} onPress={() => navigate('Mytimings', { id: this.state.routeId })}>

            <Icon color="white" name="train" type='font-awesome' size={65} />
            <Text style={styles.text}>Stations</Text>


          </TouchableOpacity>



          <TouchableOpacity style={styles.touch} onPress={ ()=>this.profile()}>
            
            <Icon color="white"  name="user" type='entypo' size={65} />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity style={styles.touch} onPress={() => navigate('Tracking', { id: this.state.routeId })}>
           
            <Icon color="white" name="map-marker-radius" type='material-community' size={65} />
            <Text style={styles.text}>Tracking</Text>
          </TouchableOpacity>



          <TouchableOpacity style={styles.touch} onPress={() => navigate('Myticket', { id: this.state.routeId })}>

            <Icon color="white" name="ticket" type='font-awesome' size={65} />
            <Text style={styles.text}>My Ticket</Text>

          </TouchableOpacity>

          <TouchableOpacity style={styles.touch}  onPress={() => navigate('Food', { id: this.state.routeId })}>

            <Icon color="white" name="food-fork-drink" type='material-community' size={65} />
            <Text style={styles.text}>Food Order</Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.touch} onPress={() => navigate('Notifications', { id: this.state.routeId })}>

            <Icon color="white" name="bell" type='font-awesome' size={65} />
            <Text style={styles.text}>Notifications</Text>

          </TouchableOpacity>


          {/* <TouchableOpacity style={styles.touch} onPress={() => navigate('Alert', { id: this.state.routeId })}>
           
            <Icon color="white" name="wechat" type='font-awesome' size={65} />
            <Text style={styles.text}>Chat</Text>

          </TouchableOpacity> */}


          <TouchableOpacity style={styles.touch} onPress={() => navigate('Penality', { id: this.state.routeId })}>
            
            <Icon color="white" name="payment" size={65} />
            <Text style={styles.text}>Penality</Text>

          </TouchableOpacity>


          <TouchableOpacity style={styles.touch} onPress={() => navigate('Alert', { id: this.state.routeId, tpi: this.state.tp_i })}>
         
            <Icon color="white" name="alarm" size={65} />
            <Text style={styles.text}>Alert</Text>

          </TouchableOpacity>
          
          <PopupDialog 
                width={0.8}
                height={0.8}
                overlayOpacity={0.5}
                dialogAnimation={new ScaleAnimation({
                toValue: 0, // optional
                useNativeDriver: true, // optional
})}

            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <View style={{flex:1}}>
            <Text style={{fontSize:25,color:'red',backgroundColor:'#7b1fa2',marginBottom:10,textAlign:'center'}}>Profile</Text>
          
<View style={{height:150,flexDirection:"row",justifyContent:'center'}}>
           
           <TouchableWithoutFeedback onPress={this.profilepic}>
            {/* <Image source={{uri:'https://facebook.github.io/react/logo-og.png'}}
                  style={styles.uploadAvatar} /> */}


                  <Image source={this.state.img}
                   style={{height:150,width:150, position:'absolute',borderRadius:100}} />

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
    backgroundColor: 'gray',
  },
  corusel: {
   // backgroundColor: 'purple',
    height: '100%', flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent:'center',
    alignItems: 'center',
    justifyContent:'center'
  },
  touch :{
    height:105,
    width:105,
    backgroundColor:'purple',
    opacity: 0.6,
   // backgroundColor:'transparent',
    borderColor: 'purple',
    margin: 5,
    justifyContent:'center',alignContent:'center',
    alignItems: 'center',
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

  },
  list: {
    flexDirection: 'row',
   
  //  justifyContent: 'center',
    flexWrap: 'wrap',
    padding:20,

},
uploadAvatar:{
  borderRadius: 100,
  position:'absolute'
}



})