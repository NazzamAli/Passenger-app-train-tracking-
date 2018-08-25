

import React, { Component } from 'react';
import {
    Button,
  Text,
  View,StatusBar
} from 'react-native';




 export default class App extends Component {
 
  constructor(props) {
    super(props);
    // this.state = { mes : this.props.navigation.state.params.message}; 
  }

    static navigationOptions = {
        header :null
      }
  
  render() {
    return (
       
     <View>
         <Text>home11 screen works ahmsk</Text>
         <Button title="click" onPress={()=>this.props.navigation.navigate('Home')} />
     </View>
    );
  }
}

