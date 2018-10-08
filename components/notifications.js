
import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ToolbarAndroid, ScrollView, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements';
import firebase from 'react-native-firebase';
import Spinner  from 'react-native-spinkit';


export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {  dataArray: [],  loading:true, 
        routeId:this.props.navigation.state.params.id,
      };

      this.ref = firebase.firestore().collection('route');


    }
    componentDidMount(){
        this.ref.doc(this.state.routeId).onSnapshot(query=>{
            console.log(query);
            this.setState({dataArray :[...query.data().notification]})
            console.log(this.state.dataArray);
           
        });

        this.state.loading=false;
}




    render() {

        return(
            <View style={styles.container}>
            {this.state.loading
           ?
           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
            <Spinner color={'red'} size={100} type={'Wave'}/>
           
           </View>
           :
            <View style={styles.container}>
            <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center' }}> Notification </Text>
            
            <ScrollView  style={{ height: 50, backgroundColor: 'powderblue'}}>
            
                <List   containerStyle={{ marginBottom: 20 }}>
             {
                 this.state.dataArray.map((l,i) => (
                     <ListItem  
                        key={i}
                         hideChevron={true}      
                         key={l}
                         title={l}
                     />
                 ))
            }
         </List>
            </ScrollView>
 

         </View>}
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
