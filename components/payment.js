
import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,ScrollView,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker, Item } from 'native-base';
import {getDistance} from 'geolib';

export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            //totalseats: this.props.navigation.state.params.total,
            stationData:[],selected1:'',loading:true,
            //myseats:this.props.navigation.state.params.myseats,
            station:[],selected2:'',
            array:[],co:true,data:[],
           // t_id:this.props.navigation.state.params.t_id,
//selected: this.props.navigation.state.params.train,
            t_id: this.props.navigation.state.params.train,

            date:this.props.navigation.state.params.date,
        };
       
        console.log(this.state.t_id);
        this.ref = firebase.firestore().collection('route');
        this.refer =firebase.firestore().collection('trainroutes');
      
        
    }

    componentDidMount(){
        this.ref.where('train_id','==',this.state.t_id).onSnapshot(query=>{
            // console.log(query.data());
            query.forEach(doc=>{
            
              this.setState({trainroute_id:doc.data().trainroute_id});
                console.log(this.state.trainroute_id);
              this.GetData();
            });
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
    fare=()=>{
        const { navigate } = this.props.navigation;
        console.log(this.state.selected1);
        console.log(this.state.selected2);
        if(this.state.selected1 == "" || this.state.selected2 == ""){
            ToastAndroid.show("Please Select Source And Destination",ToastAndroid.SHORT);
        }
        // else  if(this.state.selected1 != "" || this.state.selected2 == ""){
        //     ToastAndroid.show("Please Select Source And Destination",ToastAndroid.SHORT);
           
        // }
        // else  if(this.state.selected1 == "" || this.state.selected2 !== ""){
        //     ToastAndroid.show("Please Select Source And Destination",ToastAndroid.SHORT);
            
        // }
        // else  if(this.state.selected1 !== "" || this.state.selected2 !== ""){
        //     navigate('Seats');
        // }
        else {

            console.log(this.state.selected1);
            console.log(this.state.selected2);
            const a =this.state.selected1.split(',');
            const b =this.state.selected2.split(',');

            const lat1=a[0];
            const lng1=a[1];
            const lat2=b[0];
            const lng2=b[0]

           const dist = geolib.getDistance(
            {latitude:a[0], longitude: a[1]},
            {latitude:b[0], longitude: b[1]}
            );
            console.log(`distance ${dist}`);

            const dis =geolib.convertUnit('km',dist);
            const fare = dis*3;
            this.setState({fare:fare});
            console.log(`fare ${fare} in kn ${dis}`);
       
            navigate('Seats',{train:this.state.t_id,date:this.state.date,fare:fare,slat:lat1,slng:lng1,dlat:lat2,dlng:lng2});



        }
       
    }



    
    render() {
     
        

const {uid} =firebase.auth().currentUser;
const { navigate } = this.props.navigation;
const { params } = this.props.navigation;
return (
    <View>
    <View >
    
       <Text>{this.state.myseats} </Text>
       <Text>{this.state.totalseats}</Text>
       
    </View>
    <Button onPress={()=>navigate('Practice')}/>
                        

                        <Card title="Select source and destination" containerStyle={{height:'60%'}}>
                           
                       
                        <View style={styles.list}>                    
                            <Text  style={{ fontSize: 15, color: 'red', marginBottom: 5, textAlign: 'center' }}>Source</Text>
                            <Picker                              
                                mode="dropdown"
                                placeholder='Select'                               
                               style={{ width: 100,height:20, }}
                              
                                selectedValue={this.state.selected1}
                                onValueChange={i => {this.setState({selected1:i})}}
                            >
                              <Picker.Item label="Select" value="" />
                            {
                                this.state.stationData.map((i,index)=>{
                                return  <Picker.Item key={index} label= {`${i.name}`} value={`${i.lat},${i.lng}`} />
                                })
                            }
                                     

                            </Picker>
                            </View>




                             <Divider></Divider>   

                              <View style={styles.list}>
                            <Text  style={{ fontSize: 15, color: 'red', marginBottom: 5, textAlign: 'center' }}>Destination</Text>
                            <Picker                              
                                mode="dropdown"
                                placeholder='Select'                               
                                style={{   width: 10,height:20, }}
                                selectedValue={this.state.selected2}
                                onValueChange={i => {this.setState({selected2:i})}}
                            >
                              <Picker.Item label="Select" value="" />
                            {
                                this.state.stationData.map((i,index)=>{
                                return  <Picker.Item key={index} label= {`${i.name}`} value={`${i.lat},${i.lng}`} />
                                })
                            }
                                     

                            </Picker>
                            </View>
                            <Button
                                icon={{
                                    name: 'airline-seat-recline-extra',
                                    size: 15,
                                    color: 'white'
                                }}
                                title='Check Availability'
                                buttonStyle={styles.btnstyle}

                                onPress={this.fare}
                            />


                            </Card>


                        <View>  
                            {this.state.loading
                                ?

                                <Card>

                                    <Text>{uid}</Text>

                                </Card>

                                :
                                <View>

                                </View>}

                       
                        </View>
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
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
    },
    list: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
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