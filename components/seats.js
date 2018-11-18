

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
import { Picker, Item } from 'native-base';


MySeat=[];totalseats=[];
export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
             selected: this.props.navigation.state.params.train,
             t_s:this.props.navigation.state.params.t_s,
             t_r_id:this.props.navigation.state.params.t_r_id,
             r_id :'',
             fare : this.props.navigation.state.params.fare,
             date:this.props.navigation.state.params.date,  
            array:[],AllSeats:[],data:[],MySelection:[],
            slat: this.props.navigation.state.params.slat,
            slng: this.props.navigation.state.params.slng,
            dlat: this.props.navigation.state.params.dlat,
            dlng: this.props.navigation.state.params.dlng,
            source :this.props.navigation.state.params.source,
            destination:this.props.navigation.state.params.destination
        };

        console.log("akfgf "+this.state.slat);console.log(this.state.dlng);
        this.ref = firebase.firestore().collection('route');
       
       for(const i=1;i<=this.state.t_s;i++){
           this.state.array.push({
               value:i,
               color:"rgba(92, 99,216, 1)",
               disable:false
           });
       }
    
      
    }

    componentWillUnmount () {
        this.ref = null;
        console.log('unsubscribe is cales');
        MySeat.length=0;
        totalseats.length =0;
        this.state.AllSeats.length =0;
        this.state.MySelection.length =0;
        console.log(MySeat);
        console.log(totalseats);
    }

    componentDidMount(){
       
        var seats=[];
        console.log("this.train id "+ this.state.selected);
        this.ref.where('date','==',this.state.date).where('train_id','==',this.state.selected).onSnapshot(query => {
            console.log(query);
          query.forEach(doc => {
            seats=[...doc.data().reserved_seats];
            totalseats=[...totalseats,...doc.data().reserved_seats];
            this.setState({r_id:doc.id});
            // console.log(this.state.r_id);
            // console.log(doc.data().reserved_seats);
            // console.log(seats);
            // console.log(totalseats);
          });
         
          for(var i = 0 ;i <this.state.array.length;i++){
           
            for(var j =0 ; j < seats.length; j++){
                
                if (this.state.array[i].value == seats[j]){
                    console.log("MATCHED");

                    const a=Object.assign({},this.state.array[i]);
               
                            a.value = "B";
                            a.color ='red';
                            a.disable=true;
                            const b = Object.assign([], this.state.array);
                            b[i] = a;
                
                            this.setState({ array: b });


                }



            }

         }
        });
        
       
    }

    changeColor=(index,color)=>{
       
          const a=Object.assign({},this.state.array[index]);
        //console.log(a.color +" "+a.value+" "+index);
          
        if (a.color == 'rgba(92, 99,216, 1)'){
           // totalseats=[...totalseats,a.value];
            a.color = "green";
           
            const b = Object.assign([], this.state.array);
            b[index] = a;

            this.setState({ array: b });

            MySeat.push(a.value.toString());
          //  console.log(MySeat);
       
        }
      else{
            a.color = "rgba(92, 99,216, 1)";
            //console.log(a.color);
           // MySeats.splice(index,1);
            const b = Object.assign([], this.state.array);
            b[index] = a;

            this.setState({ array: b });
            for(let i = 0 ; i < MySeat.length; i ++ ){
                if (MySeat[i]== a.value){
                    MySeat.splice(i,1);
                   // totalseats=[...totalseats,...MySeat];

                }
            }
           

      }
            // totalseats=[...totalseats,...MySeat];
            // console.log(MySeat);
            // console.log(totalseats);
          //console.log(this.state.array);

    // this.setState({co:false});

        //  a.splice(index,3);
        // this.setState({array:a})
    
        // console.log("in="+index);
        // console.log(a);
    }
SeatsEmpty=()=>{
    //console.log('seats empty is called');
    MySeat.length=0;
    totalseats.length =0;
    this.state.AllSeats.length =0;
    this.state.MySelection.length =0;
    // console.log(MySeat);
    // console.log(totalseats);
}

    Confirm=()=>{
       
        const { navigate } = this.props.navigation;
       // console.log('confirm');
        totalseats=[...totalseats,...MySeat];
        console.log(totalseats);
        console.log(MySeat);
        console.log(this.state.fare);
        const seatslength = MySeat.length * this.state.fare;
        console.log(seatslength);
       // this.setState({fare:seatslength});
        
        // this.setState({ fare: seatslength}, () => {  //here
        //    // console.log(value);
        //     console.log(this.state.fare);
        //     //both will print same value
        // });        
        this.setState({AllSeats:totalseats});
        this.setState({MySelection:MySeat});
        // console.log(this.state.AllSeats);
        // console.log(this.state.MySelection);
        // console.log(this.state.fare);

       // navigate('Payment',{total:totalseats,myseats:MySeat,t_id:this.state.selected});
       navigate('Paypal',{ date:this.state.date,total:totalseats,myseats:MySeat,t_id:this.state.selected,route_id:this.state.r_id,fare:seatslength, StEmpt:this.SeatsEmpty.bind(this),
        slat:this.state.slat,slng:this.state.slng,dlat:this.state.dlat,dlng:this.state.dlng,
        t_r_id:this.state.t_r_id,source:this.state.source,destination:this.state.destination
       });
        
    }

    render() {

      
     
                const d =this.state.array.map((i,index)=>{
           
         return ( 
         
            <Button key={index}
            title={`${i.value}`}
            disabled ={i.disable}
            disabledStyle={{backgroundColor:'red'}}
            buttonStyle={{
                        backgroundColor: i.color,
                        borderRadius:100,
                        width:50,
                        marginBottom: 10,
                        height: 50,
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
                <View style={{marginTop:5,flexDirection:'row',justifyContent:'center'}}>
                <Icon color="blue" name="circle" type='font-awesome' size={15} />
                <Text>Available</Text>
                </View>

                <View style={{marginTop:5,flexDirection:'row',justifyContent:'center',marginBottom:6}}>
                <Icon color="red" name="circle" type='font-awesome' size={15} />
                <Text>Already Booked</Text>
                </View>

               
              
               <ScrollView style={{backgroundColor:'#eeeeee'}}>
               <View style={styles.list}>
                      
                      {d}
             

              </View>
              </ScrollView>
              <Button title="Confirm"
               icon={{
                  name: 'check-circle',
                  size: 25,
                  color: 'green'
                }}
                    buttonStyle={{backgroundColor:'transparent',width:'100%'}}
                    textStyle={{fontSize:22,color:'green'}}
                  onPress={this.Confirm}
              />
             
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
        backgroundColor:'#eeeeee',
        

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