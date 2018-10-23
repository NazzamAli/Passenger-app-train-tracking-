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
import { Picker } from 'native-base';
import { List, ListItem } from 'react-native-elements';
import {getDistance} from 'geolib';
import Sound from 'react-native-sound';


array=[];

export default class Alert extends Component {

    

    constructor(props) {
        super(props);
        this.state = {
            selected: '',geo:'',
            date: '', array:[],
            trainroute_id:'', loading : true ,refreshing:false,station: [], stationData: [],toggle:false,
            routeId:'yHvkhelq6ttixZSRX7Vr'
        };
        
        this.ref = firebase.firestore().collection('route');
        this.refer =firebase.firestore().collection('trainroutes');
        this.referr =firebase.firestore().collection('ticketreservedpassengers');

        this.whoosh = new Sound('http://soundbible.com/mp3/Beep-SoundBible.com-923660219.mp3', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
            console.log('failed to load the sound', error);
            return;
            }
            // loaded successfully
            console.log('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
        }); 

          
this.whoosh.setNumberOfLoops(0);

       
    
           
       
    }
    componentDidMount() {

        this.referr.doc('6EbQJSqWTN9MOiQHPJoq').onSnapshot(query=>{
            console.log(query.data().Alarms);
          
           
            this.setState({array:query.data().Alarms});
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

        array.length = 0;

        console.log(this.state.array)
        this.state.array.forEach((i ,ii) => {

            if(ii == index && status == true){

                
                this.whoosh.stop();
                this.whoosh.pause();
                
                array.push({
                    name : i.name,
                    status: false,
                    station_name : i.station_name
                });

            }
            else if(ii == index && status == false)
            {
            array.push({
                name : i.name,
                status: true,
                station_name : i.station_name
            });

        
            }
            else{
               
                array.push({
                    name : i.name,
                    status: i.status,
                    station_name : i.station_name
                });
            }
        })
            this.referr.doc('6EbQJSqWTN9MOiQHPJoq').update({Alarms:array });
        
    }





add =()=>{
    check = false;
    array.length = 0;
    console.log('add');
    console.log(this.state.date);
    console.log(this.state.selected);
    const data = this.state.selected.split(" ")
    const id = data[0]
    const name = data[1]
    if(this.state.array != null ){
    this.state.array.map((data) => {
       
        if(data.name != id){
        array.push({
            name : data.name,
            status: data.status,
            station_name : data.station_name
        });        
        }
        else{
            alert('Already in the Alert')
        }

    })

    // this.state.array.map(ii => {
    //     console.log('in add function' + ' '+ this.state.selected + ' /n'+ ii.id)
    //     if(this.state.selected == ii.name){
    //         alert('Already Added in the Alert');
    //         check = true;
    //         break;
    //     }
    // })

    }
    array.push({
        name :id,
        status:true,
        station_name : name
    });
    // this.setState({'array' : array})
    // console.log(array);
  

    this.referr.doc('6EbQJSqWTN9MOiQHPJoq').update({ Alarms:array});
   

    

}




    onValueChange(value) {
        this.setState({
            selected: value
        });
        this.setState({geo:this.state.selected});
        
    }



    render() {
        
       

        setInterval(()=>{
 
        if(this.state.array != null){
            this.state.array.map((i,index)=> {
                this.state.stationData.map((i2 , index2)=>{

                    if(i.status == true ){
                        console.log('matched')
                        if(i.name == i2.id){
                            console.log('inner matched'+ i2.lat)
                         const a = geolib.getDistance(
                            {latitude: i2.lat, longitude: i2.lng},
                            {latitude: 33.65795669, longitude: 73.15931726}
                        );
                        const b = geolib.convertUnit('km', a, 2)
                        if(b<15){
                        console.log("innnnnnnnnn")
                        this.whoosh.stop();            
                        this.whoosh.play(
  
                        );

                                          }
                                                                                
  
                                        }
                    }
                })

                
            }) 
        }

  
    },5000)
        //const {uid} =firebase.auth().currentUser;
        // const { navigate } = this.props.navigation;
        // const { params } = this.props.navigation;
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
                                return  <Picker.Item key={index} label= {`${i.name}`} value={`${i.id} ${i.name}`} />
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
                 this.state.array == null ? null :
                 this.state.array.map((l,i) => (
                     <ListItem  
                        key={i}
                         hideChevron={true}      
                         key={i}
                         title={l.station_name}
                         
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