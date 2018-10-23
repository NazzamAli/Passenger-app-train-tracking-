
import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight, ToolbarAndroid, ScrollView, ListItem, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Card,Icon } from 'react-native-elements'
import firebase from 'react-native-firebase';
import Spinner  from 'react-native-spinkit';




export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
       loading: true,
       tr_p:this.props.navigation.state.params.trp,
       name:'',
       cnic:'',
       phone:'',
       addr:'',

    };
    console.log(this.state.tr_p);
    this.ref = firebase.firestore().collection('ticketreservedpassengers');

  }
  componentWillMount(){
    this.ref.doc(this.state.tr_p).onSnapshot(query=>{
        console.log(query);
        this.setState({
            name:query.data().name,
            cnic:query.data().Cnic,
            phone:query.data().ContactNo,
            addr:query.data().Address
        });
        this.setState({loading:false}); console.log(this.state.name);
  })
 
  }
  componentDidMount(){
     
  }

  render() {
    const { navigate } = this.props.navigation;
    // const {uid} =firebase.auth().currentUser;
    return (
        <View style={styles.container}>

        {this.state.loading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
                <Spinner color={'red'} size={100} type={'Wave'}/>
                
                </View>
                :
        <View style={styles.container}>
        <Card title='Profile'>
            <View style={styles.list}>
        <Icon  color="green" name="user" type='entypo' size={25} />
        <Text style={{fontSize:25,color:'red',marginBottom:5,marginLeft:15,textAlign:'center'}}>{this.state.name}</Text>
            </View>

            <View style={styles.list}>
        <Icon  color="green" name="v-card" type='entypo' size={25} />
        <Text style={{fontSize:25,color:'red',marginBottom:5,marginLeft:15,textAlign:'center'}}>{this.state.cnic}</Text>
            </View>

            <View style={styles.list}>
        <Icon  color="green" name="phone" type='entypo' size={25} />
        <Text style={{fontSize:25,color:'red',marginBottom:5,marginLeft:15,textAlign:'center'}}> {this.state.phone}</Text>
            </View>

            <View style={styles.list}>
        <Icon  color="green" name="address-card" type='font-awesome' size={25} />
        <Text style={{fontSize:25,color:'red',marginBottom:5,marginLeft:15,textAlign:'center'}}>{this.state.addr}</Text>
            </View>
        </Card>

        </View>}

        </View>
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
       
        //justifyContent: 'center',
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