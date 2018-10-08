
import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ToolbarAndroid, ScrollView, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Icon } from 'react-native-elements'
import { List, ListItem } from 'react-native-elements';
import {getDistance} from 'geolib';
import firebase from 'react-native-firebase';
import {trp_id} from './login';
import Spinner  from 'react-native-spinkit';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {  reason: [], fine:[],loading: true, 
        routeId:this.props.navigation.state.params.id,
      };

      this.ref = firebase.firestore().collection('ticketreservedpassengers');
      var dis =geolib.getDistance(
        {latitude: 51.5103, longitude: 7.49347},
        {latitude: 51.525, longitude: 7.4575}
    );
    console.log(dis);
    var i=geolib.convertUnit('km', dis, 2); 
    console.log(i);

    }
    componentDidMount(){
        this.ref.doc(trp_id).onSnapshot(query=>{
          
            this.setState({reason :[...query.data().Penalties]})
            this.setState({fine :[...query.data().panlitiespayment]})
          
           
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
            <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center',color:'black' }}> Fine </Text>
            <View style={styles.list}>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center',color:'black' }}> Reason </Text>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center',color:'black' }}> Paid </Text>
            </View>
            <ScrollView  style={{ height: 50, backgroundColor: 'powderblue'}}>
            
                <List   containerStyle={{ marginBottom: 20 }}>
             {
                 this.state.reason.map((l,index) => (
                     <ListItem  
                         hideChevron={true}      
                         key={l}
                         title={l}
                         rightTitle={this.state.fine[index]}
                         rightTitleStyle={{color:'red'}}
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
         backgroundColor: 'white'
    },
    list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent:'space-between',
        flexWrap: 'wrap',
        margin:10,
       // paddingBottom: 20,
        
      },
     

});
