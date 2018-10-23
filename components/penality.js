
import React, { Component } from 'react';
import {
  Button,
  Text, TouchableOpacity, FlatList, TouchableHighlight,ToolbarAndroid, ScrollView, RefreshControl, Image,
  View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
} from 'react-native';
import { Icon, Divider } from 'react-native-elements'
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
            <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center',color:'white' }}> Fine </Text>
            <Divider style={{backgroundColor:'white'}} />
            <View style={styles.list}>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center',color:'white' }}> Reason </Text>
            <Text style={{ fontSize: 25, color: 'white', textAlign: 'center',color:'white' }}> Paid </Text>
            </View>
            <ScrollView  style={{ height: 50, backgroundColor: '#eeeeee'}}>
            
                <List   containerStyle={{ marginBottom: 20 }}>
             {
                 this.state.reason.map((l,index) => (
                     <ListItem  
                         hideChevron={true}      
                         key={l}
                         title={l}
                         titleStyle={{fontSize:20,fontFamily:'Calibri'}}
                         containerStyle={{height:70,justifyContent:'center'}}
                         rightTitle={this.state.fine[index]}
                         rightTitleStyle={{color:'red',fontSize:20}}
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
         backgroundColor: 'white',
         backgroundColor: '#455a64'
    },
    list: {
        flexDirection: 'row',
        backgroundColor: '#455a64',
        justifyContent:'space-between',
        flexWrap: 'wrap',
        margin:10,
       // paddingBottom: 20,
        
      },
     

});
