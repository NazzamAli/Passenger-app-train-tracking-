

import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight,  RefreshControl,ScrollView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'native-base';
import { trp_id } from './login';
import { List, ListItem } from 'react-native-elements';




array=[];
export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: '',geo:'',
            date: '', array:[],
            trainroute_id:'', loading : true ,refreshing:false,station: [], stationData: [],toggle:false,
            routeId:this.props.navigation.state.params.id
        };
        
        this.ref = firebase.firestore().collection('route');
        this.refer =firebase.firestore().collection('trainroutes');
        this.referr =firebase.firestore().collection('ticketreservedpassengers');


     
           
       
    }
    componentDidMount() {

        this.referr.doc('vVGk0Km0qYgD7t4B65dP').onSnapshot(query=>{
            console.log(query.data().Alarms);
           var a=Object.values(query.data().Alarms);
           
            this.setState({array:a});
            console.log(this.state.array);
        });
 










        this.ref.doc(this.state.routeId).onSnapshot(query=>{
           // console.log(query.data());
           
           
             this.setState({trainroute_id:query.data().trainroute_id});
           //  console.log(this.state.trainroute_id);
             this.GetData();
           //  this.GetFoodItems();
          });
        
        
      }
      GetData() {
        this.refer.doc(this.state.trainroute_id).onSnapshot(query=>{
           
              this.setState({station:query.data().stations});
    
              console.log(this.state.station);
      
            this.Data();
          });
      }
    
      Data() {
        var name = [];
    
        for (const i = 0; i < this.state.station.length; i++) {
          var documentReference = firebase.firestore().collection('cities').doc(this.state.station[i]);
          documentReference.get().then(documentSnapshot => {
            // check and do something with the data here.
            name.push({
              name: documentSnapshot.data().station_name,
              lat: documentSnapshot.data().lat,
              lng: documentSnapshot.data().lng,
              id :documentSnapshot.id,
              status : false
            });
            

            this.setState({ stationData: name });
            console.log(this.state.stationData);
           // this.add();
          });
         
        }
      


    }
    toggle=(status,index)=>{
        console.log(index);
        if(status === true) {
this.referr.doc('vVGk0Km0qYgD7t4B65dP').update({ ['Alarms.' + index + '.status']: false});
        }
        else {
            this.referr.doc('vVGk0Km0qYgD7t4B65dP').update({ ['Alarms.' + index + '.status']: true});
        }

    }





add =()=>{
    console.log('add');
    console.log(this.state.date);
    console.log(this.state.selected);
    array.push({
        name :this.state.selected,
        status:true
    });
    console.log(array);
   
    this.referr.doc('vVGk0Km0qYgD7t4B65dP').update({ Alarms:array});
   

    

}




    onValueChange(value) {
        this.setState({
            selected: value
        });
        this.setState({geo:this.state.selected});
        
    }



    render() {

        //const {uid} =firebase.auth().currentUser;
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Card title="Set Alarm" containerStyle={{height:'60%'}}>
                    {
                        <View style={styles.list}>
                            <View style={styles.list}>
                            <Picker
                                
                              
                                mode="dropdown"
                                placeholder='Select'
                               
                                style={{ width: 190, alignContent: 'center', alignItems: 'center' }}
                                selectedValue={this.state.selected}
                                onValueChange={i => {this.setState({selected:i})}}
                            >
                             
                            {
                                this.state.stationData.map((i,index)=>{
                                return  <Picker.Item key={index} label= {`${i.name}`} value={`${i.id},${i.name}`} />
                                })
                            }
                           
              



                            </Picker>
                            </View>
                            <View style={styles.list}>
                            
                            </View>
                            <View style={styles.list}>
                            <Button
                                icon={{
                                    name: 'alarm',
                                    size: 15,
                                    color: 'white'
                                }}
                                title='Set Alarm'
                                buttonStyle={styles.btnstyle}

                                onPress={this.add}
                            />
                            <Text>{this.state.routeId}</Text>
                            
                            </View>
                        </View>







                    }
                </Card>

               

 {/* <View style={styles.list}>
            <Text style={{ fontSize: 25, color: 'white', marginBottom: 5, textAlign: 'center' }}> Notification </Text>
             */}
            <ScrollView  style={{ height: 50, backgroundColor: 'powderblue'}}>
            
                <List   containerStyle={{ marginBottom: 20 }}>
             {
                 this.state.array.map((l,i) => (
                     <ListItem  
                        key={i}
                         hideChevron={true}      
                         key={i}
                         title={l.name}
                         
                         switchButton={true}
                         switched={l.status}
                         onSwitch={(value)=>this.toggle(l.status,i)}
                        // //  onSwitch={(value) => {
                        // // this.setState(previousState => {
                        // //     return {...previousState,toggle: value}
                        // // })
                        // //  }
                        //  }
                         
                         

                     />
                 ))
            }
         </List>
            </ScrollView>

                </View>
            // </View>

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
        width: 200,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
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