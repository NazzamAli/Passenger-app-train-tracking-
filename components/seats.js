

import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,ScrollView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'native-base';

a=[];
export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            // selected: this.props.navigation.state.params.train,
            // date:this.props.navigation.state.params.date,
            array:[],co:true,data:[]
        };
        this.ref = firebase.firestore().collection('route');
       for(const i=0;i<63;i++){
           this.state.array.push({
               value:i+33,
               color:"rgba(92, 99,216, 1)"
           });
       }
     
      
    }
    
    changeColor=(index,color)=>{
          const a=Object.assign({},this.state.array[index]);
        console.log(a.color +" "+a.value+" "+index);
          
       
          a.color="green";
          console.log(a.color); 
        const b = Object.assign([],this.state.array);
        b[index] =a;
        console.log(b.t);
       this.setState({array:b});
        this.setState({data:this.state.array});
       // this.setState({array:this.state.data});


    //      console.log(color);
          console.log(this.state.array);

    // this.setState({co:false});

        //  a.splice(index,3);
        // this.setState({array:a})
    
        // console.log("in="+index);
        // console.log(a);
    }

    render() {
     
                const d =this.state.array.map((i,index)=>{
           
         return ( 
         
            <Button key={index}
            title={`${i.value}`}
            buttonStyle={{
                        backgroundColor: i.color,
                        width:50,
                        marginBottom: 10,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
       }}
            onPress={this.changeColor.bind(this,index)} style={styles.button}
            />
         )
        })
        //const {uid} =firebase.auth().currentUser;
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation;
        return (
            <View style={styles.container}>
               <Text>{this.state.date}  {this.state.selected}</Text>
               <ScrollView>
               <View style={styles.list}>
              {d}
              </View>
              </ScrollView>
            </View>

        );
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
        width:50,
        marginBottom: 10,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
       
    },
    list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
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