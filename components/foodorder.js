

import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,ScrollView,
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
            data:[],
            name:'',
            CNIC :'',
            seats:[],
            date:'',
            source:'',
            destination:'',tracking_id:'',data1:'',
            loading:false,
            
        };
        this.ref = firebase.firestore().collection('ticketreservedpassengers');
        this.refer = firebase.firestore().collection('route');
        this.refers = firebase.firestore().collection('trainroutes');
    }
    componentWillUnmount(){
        this.ref=null;
        this.refer =null;
        this.refers =null;
    }
    componentDidMount(){
        const {uid} =firebase.auth().currentUser;


        var num =[];
        this.ref.where('userid','==',uid).onSnapshot(query=>{
            console.log(query);
           query.forEach(doc =>{
              
           if (doc.exists){
            
           num.push({
                name:doc.data().name,
                CNIC :doc.data().Cnic,
                seats:[...doc.data().seats],
                date:doc.data().date,
                tracking_id:doc.data().tracking_id,
                r_id : doc.data().route_id,
                source:doc.data().source,
                destination:doc.data().destination,
                fare:doc.data().fare
            });
           // this.setState(r_id
            console.log(this.state.date);
            console.log(this.state.r_id);
            rou_id =doc.data().route_id;
            this.setState({data:num,loading:false})
            console.log(this.state.data);
        }
        else {
            alert("You dont have any ticket");
        }

           });
        })

        // console.log("route  "+rou_id);

        // setTimeout(()=>{
        //     console.log("route  "+rou_id);

        //  this.refer.doc(rou_id).onSnapshot(query=>{
        //      console.log(query);
        //     if (query.exists){
            
        //       this.setState({trainroute_id:query.data().trainroute_id});
        //       console.log(this.state.trainroute_id);
        //       this.GetData();
        //       this.state.loading = false;
        //     }
        //     else {
        //         alert("You dont have any ticket");
        //     }
        //    });
        // },2000)

    
    
    }



    // GetData() {
    //     this.refers.doc(this.state.trainroute_id).onSnapshot(query=>{
    //         console.log(query.data());
    //         var dest=[];
    //        dest.push({
    //           //this.setState({
    //               source:query.data().source,
    //               destination:query.data().destination
    //             });
    //             this.setState({data1:dest});
    //             console.log(this.state.data1);
    //       });
        
    //   }
    
      static navigationOptions = {
        title: "Tickets"
      }

      render() {
    
//         const e = this.state.data1.map((i,index)=>{
         
//             return (
            
//             <View>
//              <Text style={{paddingLeft:10,fontSize:18,marginBottom:10,textAlign:'center'}}  key={index}>{i.source}</Text>
//                     <Text style={{paddingLeft:10,fontSize:18,marginBottom:10,textAlign:'center'}}>{i.destination}</Text> 
                    
//                     </View>
//                     )
// });


        const d= this.state.data.map((i,index)=>{
    
           return <Card key={index}  containerStyle={{width:'80%'}} 
           
            >
              
           
                      
                        <View style={styles.list}>
                         <Text style={{fontSize:18,textAlign:'center'}}>Name</Text>
                        <Text style={{fontSize:18,textAlign:'center'}}>{i.name}</Text>
                        </View>
<Divider style={{backgroundColor:'purple',marginBottom:10}} />

                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>CNIC</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.CNIC}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        {/* <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Seats</Text>    
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{this.state.seats}</Text>
                        </View> */}

                        

                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Date</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.date}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Source</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.source}</Text>
                        </View>
                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Destination</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.destination}</Text>
                        </View>

                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Fare</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.fare} $</Text>
                        </View>

                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={styles.list}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Tracking id</Text>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{i.tracking_id}</Text>
                        </View>

                        <Divider style={{backgroundColor:'purple',marginBottom:10}} />
                        <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>Seats</Text> 
                        <View style={{marginLeft:165,flexDirection:'row'}}>
                        <Text style={{alignContent:"space-between"}}>{i.seats}</Text>
                       </View>
                        </View>

                         <View style={{flexDirection:'row'}}>
                        
                        {/* <View style={{marginLeft:165,flexDirection:'row'}}>
                        <Text>{e}</Text>
                       </View> */}
                        </View>
                
                
            </Card>
        });
      
        
    
    
    
    
    
        return (
          <View style={styles.container}>
          {this.state.loading
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'white' }}>
             <Spinner color={'red'} size={100} type={'Wave'}/>
            
            </View>
            :
            
          
    
        <View style={styles.container}>
        
        <ScrollView style={styles.contentContainer}>
            <View style={styles.list1}>
            {d}
            </View>
            
             
        </ScrollView>
          
        </View>}
        </View>
        );
      }
    }




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        //width:null

    },
    contentContainer: {
      //  paddingVertical: 50,
        marginBottom:10
    //    alignContent:"center",
    //    justifyContent:'center'
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
       // justifyContent: 'center',
      
        flexWrap: 'wrap',
        //marginBottom:100,
        paddingBottom: 2,
        width:'100%',
        alignContent: 'space-between',
        justifyContent: 'space-between'
    },
    list1: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent:'center',
        flexWrap: 'wrap',
        paddingBottom: 20,
        
      },
    listcontainer: {
       // width: '100%',
        backgroundColor: 'blue',
        flexDirection: 'row',
      backgroundColor: 'white',
      justifyContent:'center',
      flexWrap: 'wrap',
      paddingBottom: 200,
    },
    Iconlist: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    }

});