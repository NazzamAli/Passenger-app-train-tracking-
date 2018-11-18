

import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'native-base';
import Spinner  from 'react-native-spinkit';




rou_id ='';
export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
           // routeId:this.props.navigation.state.params.id,
            trainroute_id:'',r_id:'',
            name:'',
            CNIC :'',
            seats:[],
            date:'',
            source:'',
            destination:'',tracking_id:'',
            loading:true,
            
        };
        this.ref = firebase.firestore().collection('ticketreservedpassengers');
        this.refer = firebase.firestore().collection('route');
        this.refers = firebase.firestore().collection('trainroutes');
    }
    componentDidMount(){
        const {uid} =firebase.auth().currentUser;



        this.ref.where('userid','==',uid).onSnapshot(query=>{
            console.log(query);
           query.forEach(doc =>{
              
           if (doc.exists){
            
            this.setState({
                name:doc.data().name,
                CNIC :doc.data().Cnic,
                seats:[...doc.data().seats],
                date:doc.data().date,
                tracking_id:doc.data().tracking_id,
                r_id : doc.data().route_id

            });
            console.log(this.state.date);
            console.log(this.state.r_id);
            rou_id =this.state.r_id;
            console.log(rou_id);
        }
        else {
            alert("You dont have ticket");
        }

           });
        })

        console.log("route  "+rou_id);

        setTimeout(()=>{
            console.log("route  "+rou_id);

         this.refer.doc(rou_id).onSnapshot(query=>{
             console.log(query);
            if (query.exists){
            
              this.setState({trainroute_id:query.data().trainroute_id});
              console.log(this.state.trainroute_id);
              this.GetData();
              this.state.loading = false;
            }
            else {
                alert("You dont have any ticket");
            }
           });
        },2000)

    
    
    }



    GetData() {
        this.refers.doc(this.state.trainroute_id).onSnapshot(query=>{
            console.log(query.data());
              this.setState({
                  source:query.data().source,
                  destination:query.data().destination
                });
       
             
          });
      }
    



    render() {
       const d = this.state.seats.map((i,index)=>{
         
          return  <Text style={{paddingLeft:10,fontSize:18,marginBottom:10,textAlign:'center'}}  key={index}>{i}</Text> 
        });
        //const {uid} =firebase.auth().currentUser;
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation;
        return (
            <View style={styles.container}>

                {this.state.loading
                        ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor:'white'}}>
                        {/* <Spinner color={'red'} size={100} type={'Wave'}/> */}
                       
                        </View>
                        :
                        <View style={styles.container}>
                    





                <Card title="My Ticket" containerStyle={{height:'90%',backgroundColor:'#eeeeee'}}
                titleStyle={{fontSize:20,fontFamily:'Calibri'}}
                dividerStyle={{backgroundColor:'purple',width:150,marginLeft:90}}>
                    {
                        <View >
                        {/* <View >
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Name</Text>
                        <View style={{justifyContent:"center",alignContent:'center',alignItems:'center',marginBottom:50}}>
                            {d}
                         </View>
                        </View> */}
                        <View style={styles.list}>
                         <Text style={{fontSize:18,textAlign:'center'}}>Name</Text>
                        <Text style={{fontSize:18,textAlign:'center'}}>{this.state.name}</Text>
                        </View>
<Divider style={{backgroundColor:'purple',marginBottom:10}} />

                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>CNIC</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.CNIC}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        {/* <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Seats</Text>    
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.seats}</Text>
                        </View> */}

                        

                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Date</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.date}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Source</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.source}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Destination</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.destination}</Text>
                        </View>
                        
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Tracking id</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.tracking_id}</Text>
                        </View>

                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Seats</Text> 
                        <View style={{marginLeft:165,flexDirection:'row'}}>
                       {d}
                       </View>
                        </View>


</View>

                    }
                </Card>
                </View>}
            </View>

        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',


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
        backgroundColor:'#eeeeee',
        //justifyContent: 'center',
        flexWrap: 'wrap',
        paddingBottom: 20,
        alignContent: 'space-between',
        justifyContent: 'space-between'
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