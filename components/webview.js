import React, { Component } from 'react';
import { View, StyleSheet, Button, WebView } from 'react-native';



export default class webView extends Component {

    constructor(props){
        super(props);
        this.state = {
        showWebView: true
}
    }


renderContent() {
    return (
      <WebView
        source={{
          uri: 'https://www.google.com',
       }}
      //  onNavigationStateChange={this.onNavigationStateChange}
        startInLoadingState
        scalesPageToFit
        javaScriptEnabled
        style={{ flex: 1 }}
      />
    );
   }
onNavigationStateChange = navState => {
  this.hide();

};
hide(){
  //navigate('Home');
}

render() {
 return (
           <View style={styles.container}>
         
{this.renderContent()}
          <View>
              <Button title="click"
                  onPress={()=>
                  //this.setState({showWebView:false})
                  this.props.navigation.navigate('Home1')
                  }
              />
          </View>
          </View>
     
        );
      
    
}
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
//    alignItems: 'center',
//    justifyContent: 'center',
  
//    backgroundColor: '#ecf0f1',
 },
});