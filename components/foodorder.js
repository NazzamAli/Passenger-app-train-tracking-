

// import React, { Component } from 'react';
// import {
//   Button,
//   Text, TouchableOpacity, FlatList, TouchableHighlight, ListItem, RefreshControl,
//   View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid
// } from 'react-native';
// import firebase from 'react-native-firebase';





// export default class App extends Component {

//   constructor() {
//     super();
//     //this.state = { loading: false };


//   }

//   componentDidMount() {

//   }
//     static navigationOptions = {
//     header: null
//   }

//   render() {
//     const { navigate } = this.props.navigation
//     return (
//       // this.state.loading
//       //   ?
//       //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       //     <ActivityIndicator size="large" color="#0000ff" />
//       //   </View>
//       //   :
//       <View>
//       <Text>ahemhhakjfh</Text>
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#0000ff" />
//          </View>
//         <View style={[styles.container, styles.horizontal]}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <ActivityIndicator size="small" color="#00ff00" />
//         <ActivityIndicator size="large" color="#0000ff" />
//         <ActivityIndicator size="small" color="#00ff00" />
//       </View>
//     </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center'
//   },
//   horizontal: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 10
//   }
// })
import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text, Picker,
  View, Modal, TouchableHighlight, TouchableOpacity,FlatList
} from 'react-native';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';





export default class App extends Component {
  constructor() {
    super();
    this.state = { foodlist: [] ,count:0,num:0}
    this.ref = firebase.firestore().collection('fooditems');
  }



  static navigationOptions = {
    header: null
  }
 

  onSelectionsChange = (selectedFruits) => {
    // selectedFruits is array of { label, value }
    this.setState({ selectedFruits });
  }
  componentDidMount() {
    console.log("Compounutn monte");
    this.GetFoodItems();
  }

  GetFoodItems() {
    console.log("get food function");
    var names = [];
    this.ref.onSnapshot(query => {
      console.log(query);
      query.forEach(doc => {
        names.push(doc.data().name);
        console.log("lodssd" + doc.data().name)
      });
      this.setState({ dataArray: names });

    });

  }

  _incrementCount = () => {
    this.setState({
      count:this.state.count + 1,
      num:this.state.count
    });
    console.log(this.state.count);
  }

















  renderItem=({item})=>{
    var {navigate}=this.props.navigation
      return (
        <View style={styles.list} >
        <View>
       <TouchableOpacity onPress={()=>navigate('Stations',{trainName:item})}>
      
        <Text style={{fontSize:25,marginBottom:10,textAlign:'center'}}>
          {item}
        </Text>
        <Text  style={{fontSize:8,color:'blue'}}>{this.state.num}</Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontSize:25,color:'purple',marginBottom:10,textAlign:'right'}}>
            
            <Icon color="black" name="check" size={20} onPress={() => console.log('hello ahmed')}/>
            </Text>
            <Text>{this.state.count}</Text>
        </View>
        
        </View>
        
      );
  }

  renderSeparator=()=>{
    return(
      <View
      style={{
        height:1,
        width:'100%',
        backgroundColor:"#CED0CE",
        //marginLeft:"14%"
      }}

      />
    );
  };










  render() {

    return (
      //  <View >
      //  <Text>Select food item</Text>
      //  <SelectMultiple
      //     items={this.state.foodlist}
      //     selectedItems={this.state.selectedFruits}
      //     onSelectionsChange={this.onSelectionsChange} />


      // </View>
      <View style={styles.container}>
        <View style={styles.container}>
        <Text  style={{fontSize:25,color:'purple',marginBottom:10,textAlign:'center'}}>Total {this.state.count}</Text>
         <View style={styles.listcontainer}>
         <FlatList
          data={this.state.dataArray}

          renderItem={this.renderItem}


          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          

        />
        </View>
        <View><Text>ahmed</Text></View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  list: {
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  listcontainer :{
    width:'80%',
    backgroundColor:'blue'
  }

});