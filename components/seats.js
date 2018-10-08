

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
            // selected: this.props.navigation.state.params.train,
            // date:this.props.navigation.state.params.date,
            array:[],AllSeats:[],data:[],MySelection:[]
        };
        this.ref = firebase.firestore().collection('route');
       
       for(const i=0;i<63;i++){
           this.state.array.push({
               value:i,
               color:"rgba(92, 99,216, 1)",
               disable:false
           });
       }
     
      
    }

    componentDidMount(){
       
       // this.GetData();
        var seats=[];
        this.ref.where('date','==','2018-10-03').where('train_id','==','eOlVKfe1y6mz34sxHxFp').onSnapshot(query => {
            
          query.forEach(doc => {
            seats=[...doc.data().reserved_seats];
            totalseats=[...totalseats,...doc.data().reserved_seats];
            console.log(doc.data().reserved_seats);
            console.log(seats);
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

            MySeat.push(a.value);
            console.log(MySeat);
       
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

    Confirm=()=>{
        const { navigate } = this.props.navigation;
        console.log('confirm');
        totalseats=[...totalseats,...MySeat];
        console.log(totalseats);
        console.log(MySeat);
        
        this.setState({AllSeats:totalseats});
        this.setState({MySelection:MySeat});
        console.log(this.state.AllSeats);
        console.log(this.state.MySelection);

        navigate('Payment',{total:totalseats,myseats:MySeat});
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
              <Button title="Confirm"
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