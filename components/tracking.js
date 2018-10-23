import React,{Component} from 'react';

import MapView,{Marker, Circle} from 'react-native-maps';
import {Text,View,Switch,Dimensions} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import firebase from 'react-native-firebase';
import getDistance from 'geolib';
import { Icon, Button } from 'react-native-elements';


import {slat} from './login';
import {slng} from './login';
import {dlat} from './login';
import {dlng} from './login';



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
           routeId:this.props.navigation.state.params.id,

            citiesData:[{
                id : '',
                name : '',
                lat : 0,
                lng : 0,
                
            }],
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
                longitude : 73,
                latitude : 24
            }],
            citiesTime : [],
            speed : 0,
            trainsDataDistance : [],
            citiesDataDistance : []
            
        }
        
        console.log(this.state.routeId+"  lnjjnjn"+ slat);
        
        this.citiesref = firebase.firestore().collection('cities');
        this.trainrouteref = firebase.firestore().collection('trainroutes');
        this.routeref = firebase.firestore().collection('route');
        this.trainref = firebase.firestore().collection('trains');      

        const a = geolib.getDistance(
            {latitude: this.state.trains[0].longitude, longitude: this.state.trains[0].latitude},
            {latitude: dlat, longitude: dlng}
        );

         bb =geolib.convertUnit('km', a, 2)

        console.log("trainsjb"+ a +" in km" +bb);



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
      
             
            //    console.log(this.unsubscribe);
        
        

            this.unsubscribee = this.routeref.doc(this.state.routeId).onSnapshot(query1 => {
   
                
                // console.log("in train route id"+ '' + d1._data.train_id )
                // train_data.push({
                //     train_id : d1._data.train_id
                // })
                 
         
                this.trainref.doc(query1.data().train_id).onSnapshot(query2 => {
                    
                            console.log(query2.data().Latitude)
                            queryData.push({
                                latitude : query2.data().Latitude,
                                longitude : query2.data().Longitude,
                            })       
                            
                            this.setState({trains : queryData})
                })
                
            })
    
                // setInterval(()=> {
                // navigator.geolocation.getCurrentPosition(
                //     position => {


                //         var lat = position.coords.latitude;
                //         var long = position.coords.longitude;  
                //         var speed = position.coords.speed

                //         this.setState({speed : speed})
                //     })
                // },1000)
                
                
                
             // this.firestore()

            // this.state.citiesDataDistance.forEach(i=>{
            //     console.log(i)
            // })


            this.routeref.doc(this.state.routeId).onSnapshot(query=>{
                // console.log(query.data());
                
                
                  this.setState({trainroute_id:query.data().trainroute_id});
                //  console.log(this.state.trainroute_id);
                  this.GetData();
                //  this.GetFoodItems();
               });
             
             
           }
   
   
           GetData() {
             this.trainrouteref.doc(this.state.trainroute_id).onSnapshot(query=>{
                
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
                 });
                 
     
                 this.setState({ citiesData: name });
                 console.log(this.state.citiesData);
                // this.add();
               });
              
             }
             console.log(this.state.citiesData);
             
             this.firestore()
     
     
         }
     
                

   
        



       firestore(){
        citiesDataDistanceTemp.length = 0;
        citiesTime = []
        



    //            var lat = event.coordinate.latitude;
    //            var long = event.coordinate.longitude;  
    //            var speed = event.coordinate.speed;

               

    //            // alert(speed);
    //            this.setState({speed : speed})
    //            var initialRegion = {
    //                latitude : lat,
    //                longitude : long,
    //                latitudeDelta : LATITUDE_DELTA,
    //                longitudeDelta : LONGITUDE_DELTA,
    //            }

    //    //        this.getDistance(lat,long);

    //            this.setState({initialPosition : initialRegion});
    //            this.setState({markerPosition : initialRegion});
    //            this.whoosh.pause();            
               
               this.state.citiesData.map((marker,index)=>{
                   console.log(this.state.trains[0].latitude)
               const a = geolib.getDistance({
                latitude : this.state.trains[0].latitude,
                longitude : this.state.trains[0].longitude
                }, {
               latitude: marker.lat,
               longitude: marker.lng
               });
               console.log(a)
               const b = geolib.convertUnit('km', a, 2)
               var time = 0;
               if(this.state.speed == 0){
               const t =  (70 * 60)
               time = a / t;
               time = 3.6 * time;
               }else{
               const t =  (this.state.speed * 60)
               time = a / t;
               time = 3.6 * time;
               }
               console.log("time"+ '' +time)
               citiesTime.push(time);
               citiesDataDistanceTemp.push(b);
           })

           if(LATITUDE_DELTA != 0.0030){
                   LATITUDE_DELTA = 7.0432;  
                   LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;    
                  
           }     
           this.setState({citiesDataDistance : citiesDataDistanceTemp})
           this.setState({citiesTime : citiesTime})
     
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


// _handleMapRegionChange = mapRegion => {
//     this.setState({ initialPosition : mapRegion });
//   };


render(){

    // this.state.citiesDataDistance.forEach(
    //     m => {
    //         console.log("data" + " " +m)
    //     }
    // )
    // this.citiesETA.forEach(m => console.log(m.distance))

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
            // showsUserLocation={true}
             //followUserLocation={true}
            zoomEnabled={true}
            loadingEnabled = {true}
            //onRegionChange={this._handleMapRegionChange}
            // onUserLocationChange={event => this.firestore(event.nativeEvent)}
            
        >
        <Marker 
        coordinate={{latitude : this.state.trains[0].latitude,
                longitude : this.state.trains[0].longitude}}
        title='your own'
        >
            <Icon
                 name='train' />


              <MapView.Callout style={{backgroundColor : 'green'}}   tooltip={true} flat={true}>

<Text key={bb} style={{color:'#fff'}} >dis  { bb }</Text>


</MapView.Callout>     

        </Marker>

           <Marker 
        coordinate={{latitude : parseFloat(slat),
                longitude : parseFloat(slng)}}
        title='your stop'
        >
            


              <MapView.Callout style={{backgroundColor : 'red'}}   tooltip={true} flat={true}>

<Text key={bb} style={{color:'#fff'}} > { bb }</Text>


</MapView.Callout>     

        </Marker>
        {/* <Circle
        center = {this.state.markerPosition}
        radius = {30}
        fillColor = 'rgba(100,150,255,0.5)'
        
        >

        </Circle> */}
        
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
         {this.state.citiesData.map((marker,index) => 
    (
            <MapView.Marker 
            coordinate={{latitude : marker.lat,
                          longitude : marker.lng}}
            title={marker.name}
            pinColor = 'green'
            key = {index}
            >
        
        <MapView.Callout style={{backgroundColor : 'green'}}  key={index} tooltip={true} flat={true}>

            <Text key={marker.name} style={{color:'#fff'}} > { marker.name }</Text>
            <Text key={this.state.citiesDataDistance[index]} style={{color:'#fff'}} > { this.state.citiesDataDistance[index] } km</Text>
            <Text key={this.state.citiesTime[index]} style={{color:'#fff'}} > { this.state.citiesTime[index] } Minutes</Text>
            

     
     </MapView.Callout>



            {/* <MapCallout Distance = {this.citiesETA}>
            </MapCallout>
         */}
    </MapView.Marker>
        ))}

        </MapView>   


      </View>
    
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
           backgroundColor: 'silver', 
           justifyContent: 'space-between', 
           alignItems: 'center',
           position: 'absolute',
           bottom: 0,
           flexDirection : 'row'
   
       }
}