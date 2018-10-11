import React,{Component} from 'react';
import MapView,{Marker, Circle} from 'react-native-maps';
import {Text,View,Switch,Dimensions} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import getDistance from 'geolib';
import { Icon, Button } from 'react-native-elements';

const {width,height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 7.0432
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
var citiesDataDistanceTemp = [];
var trainsDataDistanceTemp = [];
var queryData = [];    
var id = 0; 
const firstLoad = true;
export default class PassengerMap extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            // citiesData:[{
            //     train_id : '',
            //     city_name : '',
            //     coordinates:{
            //     latitude : 0,
            //     longitude : 0,
            //     }
            // }],
            initialPosition: {
                latitude : 0,
                longitude : 0,
                latitudeDelta : 0,
                longitudeDelta : 0,
            },
            markerPosition: {
                latitude :0,
                longitude: 0,
            },
            trains:[{
                longitude : 0,
                latitude : 0
            }],
            // citiesTime : [],
            // speed : 0,
            passengerStation : [],
            trainsDataDistance : [],
            // citiesDataDistance : []
          
            
        }

        this.trainref = firebase.firestore().collection('trains');
        

        // this.state = {
        //     markers: [{
        //       title: 'hello',
            //   coordinates: {
            //     latitude: 3.148561,
            //     longitude: 101.652778
        //       },
        //     },
        //     {
        //       title: 'hello',
        //       coordinates: {
        //         latitude: 3.149771,
        //         longitude: 101.655449
        //       },  
        //     }]
        //   }
           
    }

    componentDidMount(){

        // this.ref = firebase.firestore().collection('cities');
        // this.unsubscribe = this.ref.onSnapshot(query => {
        //     query.docs.forEach(d =>{
                // queryData.push({
                //     city_name : d._data.city_name,
                //     coordinates:{
                //     latitude :d._data.lat,
                //     longitude : d._data.lng,
                //     } 
                // })
        //     })
            

            // this.setState({
            //     cities : queryData
            // })
            // // query.forEach(doc => {
            //     queryData.push({
            //         dataf : doc.data()
            //     })
            //    });
            //    debugger;
            //     this.setState({
            //        cities : queryData
            //    })
           
               //})             
            // this.state.citiesData.length = 0;
            // //    console.log(this.unsubscribe);
            // var date =new Date();
            // let year=date.getFullYear();
            // let month=("0" + (date.getMonth() + 1)).slice(-2);
            // let day=("0" + date.getDate()).slice(-2);
            // console.log("DUTY Year "+year+" Month "+month+" DAy "+day);
            // console.log(this.props.myPropDriver);
            
            this.citiesref = firebase.firestore().collection('cities');
            this.train = firebase.firestore().collection('trains');
            this.routeref = firebase.firestore().collection('route');
            this.unsubscribe = this.routeref.doc('yHvkhelq6ttixZSRX7Vr').onSnapshot(query1 => {
   
                
                    // console.log("in train route id"+ '' + d1._data.train_id )
                    // train_data.push({
                    //     train_id : d1._data.train_id
                    // })
                     
             
                    this.train.doc(query1.data().train_id).onSnapshot(query2 => {
                        
                                
                                queryData.push({
                                    latitude : query2.data().Latitude,
                                    longitude : query2.data().Longitude,
                                })       
                                
                                this.setState({trains : queryData})
                    })
                    
                })
                

            
            
            // this.routeref.where('driver_id','==','ZSttE9z6Vjdg4KhLsB7v').onSnapshot(query1 => {
   
            //     query1.docs.forEach(d1 =>{

            //         train_data : {
            //             train_id : d1._data.train_id
            //         }

            //     })
            // })
            
            // this.unsubscribeagain = this.trainref.onSnapshot(query => {
            //     const queryData = [];     
            //     query.forEach(doc => {
            //         queryData.push({
            //         id : doc.id,    
            //         Train_No : doc.data().Train_No,
            //         name : doc.data().name,
            //         Latitude : doc.data().Latitude,
            //         Longitude : doc.data().Longitude
            //         });
            //       });
            //       this.setState({
            //         trains : queryData
            //       });            
            //         });

                    // setInterval(()=> {
                    // navigator.geolocation.getCurrentPosition(
                    //     position => {


                    //         var lat = position.coords.latitude;
                    //         var long = position.coords.longitude;  
                    //         var speed = position.coords.speed

                    //         this.setState({speed : speed})
                    //     })
                    // },1000)
                    
                    
                //     setInterval(()=>{
                    
                //      citiesDataDistanceTemp.length = 0;
                //      trainsDataDistanceTemp.length = 0;
                //      trainsInfoPassingTemp = [];
                //      trainsInfoTemp = [];
                //      citiesTime = []
                     
                //     navigator.geolocation.getCurrentPosition(
                //         position => {


                //             var lat = position.coords.latitude;
                //             var long = position.coords.longitude;  
                //             var speed = position.coords.speed;

                            

                //             // alert(speed);
                //             this.setState({speed : speed})
                //             var initialRegion = {
                //                 latitude : lat,
                //                 longitude : long,
                //                 latitudeDelta : LATITUDE_DELTA,
                //                 longitudeDelta : LONGITUDE_DELTA,
                //             }

                //     //        this.getDistance(lat,long);

                //             this.setState({initialPosition : initialRegion});
                //             this.setState({markerPosition : initialRegion});

                //             this.state.citiesData.map((marker,index)=>{
                //             const a = geolib.getDistance(position.coords, {
                //             latitude: marker.coordinates.latitude,
                //             longitude: marker.coordinates.longitude
                //             });
                //             const b = geolib.convertUnit('km', a, 2)
                //             var time = 0;
                //             var data = 0;
                //             if(this.state.speed == 0){
                //             const t =  (70 * 60)
                //             time = a / t;
                //             time = 3.6 * time;
                //             }else{
                //             const t =  (this.state.speed * 60)
                //             time = a / t;
                //             time = 3.6 * time;
 
                //             }
                //             console.log("time"+ '' +time)
                //             citiesTime.push(time);
                //             citiesDataDistanceTemp.push(b);
                //         })

                //         this.state.trains.map((marker,index)=>{
                //             const a = geolib.getDistance(position.coords, {
                //                 latitude: marker.Latitude,
                //                 longitude: marker.Longitude
                //             });
                            
                //             console.log(a);
                //             const b = geolib.convertUnit('km', a, 2);
                //             console.log("d" + '' +b);
                //             console.log('info' + ''+marker)
                //             trainsDataDistanceTemp.push(b);
                //             trainsInfoTemp.push(marker);
                //         })
                        
                //         if(LATITUDE_DELTA != 0.1022){
                //                 LATITUDE_DELTA = 7.0432;  
                //                 LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;    
                //         }      
                       
                //         trainsDataDistanceTemp.map((i,index) => {
                //             if(i < 15 && id != trainsInfoTemp[index].id ){  
                                
                //                 LATITUDE_DELTA = 0.4522;  
                //                 LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;                            
                //                 console.log(trainsInfoTemp[index]);
                //                 trainsInfoPassingTemp.push(trainsInfoTemp[index]); 
                //             }
                            
                //         })
                //         this.setState({citiesDataDistance : citiesDataDistanceTemp})
                //         this.setState({trainsDataDistance : trainsInfoPassingTemp})
                //         this.setState({citiesTime : citiesTime})

                //         this.trainref.doc(id).update({
                //             Longitude : position.coords.longitude,
                //             Latitude : position.coords.latitude
                //         })
                        
                //         },
                //         function() {
                //             alert('Position could not be determined.')
                //         },
                //         {
                //             enableHighAccuracy: true
                //         }
                //     );

                // },3000)

                // this.state.citiesDataDistance.forEach(i=>{
                //     console.log(i)
                // })



                    

       }

       onpresszoomin(){
           alert("zoom in")
        LATITUDE_DELTA = 0.1022;  
        LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;    
       }
       onpresszoomout(){
        LATITUDE_DELTA = 7.0432;  
        LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;    
       }
       componentWillMount(){
    
          

        }
    
//     render(){       
       
//         //console.log(train_id[0]);
//         // this.state.train_dataa.forEach(d => {
//         //     console.log(d.train_id)
//         // })
//         //debugger;
//             //console.log(train_id[0])
//             // queryData.forEach( d=> console.log(d.coordinates.latitude + "," + d.coordinates.longitude))
//            // (<TrainAccidentAlert train_id = {this.state.train_id}></TrainAccidentAlert>)
//         return(
//             //<Text>Haider</Text>
//        // <GoogleMaps trains={this.state.trains} citiesMarker = {this.state.citiesData}  ></GoogleMaps>
//             //<TrainAccidentAlert></TrainAccidentAlert>
//         //     <View style={styles.mapStyle}>
//         //     <MapView style={styles.maps}
//         //         initialRegion={{
//         //         latitude: 33.6844, 
//         //         longitude: 73.0479,
//         //         latitudeDelta: 0.0922,
//         //         longitudeDelta: 0.0421,
//         //         }}
//         //         showsUserLocation={true}
//         //         followUserLocation={true}
//         //         zoomEnabled={true}
//         //     >
                
//         //         {queryData.map(marker => (
//         //         <MapView.Marker 
//         //         coordinate={marker.coordinates}
//         //         />
//         //     ))}</MapView>
//         // </View> 
//         //<Listview passengers={this.state.cities}></Listview>
//         );  
//     }
// }

// const styles = {
//     mapStyle:{
//         position:'absolute',
//         right:0,
//         top:0,
//         left:0,
//         bottom:0,
//         jutifyContent:'flex-end',
//         alignItems:'center'
//     },
//     maps:{
//         position:'absolute',
//         top:0,
//         right:0,
//         left:0,
//         bottom:0
//     }
// }

render(){

    // this.state.citiesDataDistance.forEach(
    //     m => {
    //         console.log("data" + " " +m)
    //     }
    // )
    // this.citiesETA.forEach(m => console.log(m.distance))

//console.log(this.state.initialPosition.latitude);
return(
    
    // <View style={styles.h}>
<View style = {{width : width ,height :height,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection : 'row',
    }}>
<View style={styles.mapStyle}>

        <MapView style={styles.maps}
            // region={{
            // latitude:33.6844,
            // longitude:73.0479,    
            // latitudeDelta: 0.0922,
            // longitudeDelta: 0.0421,
            // }
            region = {{
                longitudeDelta : LONGITUDE_DELTA,
                latitudeDelta : LATITUDE_DELTA,
                latitude : this.state.trains[0].latitude,
                longitude : this.state.trains[0].longitude
            }}                
            showsUserLocation={true}
             //followUserLocation={true}
            zoomEnabled={true}
            loadingEnabled = {true}
            
        >
        <Marker 
        coordinate={{
            latitude : this.state.trains[0].latitude,
            longitude : this.state.trains[0].longitude
        }}
        title='your own'
        >
            <Icon
                 name='train' />

        </Marker>
        <Marker 
        coordinate={{
            latitude :33.6844 ,
            longitude :73.0479 
        }}
        title='Islamabad'
        >
            <Icon
                 name='train' />

        </Marker>
        {/* <MapViewDirections
            origin={this.state.markerPosition}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            onReady={this.onReady}
            onError={this.onError}            
        >
        </MapViewDirections>
         */}
    {/* {this.state.citiesData.map((marker,index) => 
    (
            <MapView.Marker 
            coordinate={{latitude : marker.coordinates.latitude,
                          longitude : marker.coordinates.longitude}}
            title={marker.city_name}
            pinColor = 'green'
            key = {index}
            >
        
        <MapView.Callout style={{backgroundColor : 'green'}}  key={index} tooltip={true} flat={true}>

            <Text key={this.state.citiesDataDistance[index]} style={{color:'#fff'}} > { this.state.citiesDataDistance[index] } km</Text>
            <Text key={this.state.citiesTime[index]} style={{color:'#fff'}} > { this.state.citiesTime[index] } Minutes</Text>

        </MapView.Callout>

            
    </MapView.Marker>
        ))} */}

   {/* {this.state.trainsDataDistance.map((marker,index) => 
   (
            <MapView.Marker 
            key={index} coordinate={{latitude : marker.Latitude,longitude:marker.Longitude}}
            >
            
            <MapView.Callout style={{backgroundColor : 'red'}} key={index} tooltip={true} flat={true}>
            <Text key={marker.name} style={{color:'#fff'}} > { marker.name } </Text>
            <Text key={marker.Train_No} style={{color:'#fff'}} > { marker.Train_No } </Text>
            </MapView.Callout>

            </MapView.Marker>
            ))}
        </MapView>   


      </View> */}
    
        {/* <NextStation
        stationsDistanceData = {this.state.citiesDataDistance}
        stationTimeData = {this.state.citiesDataTime}
        >
        </NextStation> */}

        {/* <NextStation speed={this.state.speed}></NextStation> */}
        {/* {this.state.citiesData.map((marker,index) => 
                { 
                  
                   
            })} */}
        {/* <TrainAccidentAlert currentLocation={this.state.markerPosition} train_id_data = {this.state.citiesData}></TrainAccidentAlert>
     */}
     {/* <View style={styles.container}>
        <Button title='zoom-in' backgroundColor = '#000'  borderRadius = {5} fontSize = {10} onPress = {this.onpresszoomin.bind(this)}></Button>
        <Text style={{fontSize : 10, color : '#fff', fontWeight : '100'  }}>Speed : {this.state.speed} </Text>
        <Button title='zoom-out' backgroundColor = '#000'  borderRadius = {5} fontSize = {10} onPress = {this.onpresszoomout.bind(this)}></Button>
    </View> */}
    </MapView>
    </View>
</View>

    );
}
}

const styles = {
mapStyle:{
    position:'absolute',
    right:0,
    top:0,
    left:0,
    bottom:0,
    justifyContent:'flex-start',
    alignItems:'center'
},
maps:{
    position:'absolute',
    top:0,
    right:0,
    left:0,
    bottom:0
},customView: {
    width: 140,

  },    HeaderContentStyle:{
    flexDirection:'column',
    justifyContent: 'space-around'
},
TextStyle:{
            fontSize : 12
       },
       container : {
   
           width: width, 
           height: 70, 
           backgroundColor: '#525B56', 
           justifyContent: 'space-between', 
           alignItems: 'center',
           position: 'absolute',
           bottom: 0,
           flexDirection : 'row'
   
       }
}