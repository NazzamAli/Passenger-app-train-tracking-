

import React, { Component } from 'react';
import {
    Image,
    Text, TouchableOpacity, FlatList, BackHandler,
    BackHandlerBackHandler, TouchableHighlight, ListItem, RefreshControl,
    View, StatusBar, FlatListItem, StyleSheet, style, ActivityIndicator, ToastAndroid, BackAndroid,
} from 'react-native';
import firebase from 'react-native-firebase';
import { Card, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Picker } from 'native-base';


export default class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            selected: 'Karakaram',
            date: ''
        };
        this.ref = firebase.firestore().collection('foodorder');


    }

    onValueChange(value) {
        this.setState({
            selected: value
        });

        console.log(this.state.date);
        console.log(this.state.selected);
    }



    render() {

        //const {uid} =firebase.auth().currentUser;
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Card title="Seat Booking" containerStyle={{height:'60%'}}>
                    {
                        <View style={styles.list}>
                            <View style={styles.list}>
                            <Picker
                                note
                                mode="dropdown"
                                style={{ width: 160, alignContent: 'center', alignItems: 'center' }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Karakaram" value="Karakaram" />
                                <Picker.Item label="Green Line" value="Green Line" />
                                
                            </Picker>
                            </View>
                            <View style={styles.list}>
                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                format="YYYY-MM-DD"
                                minDate="2017-05-01"
                                maxDate="2022-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => { this.setState({ date: date }) }}
                            />
                            </View>
                            <View style={styles.list}>
                            <Button
                                icon={{
                                    name: 'airline-seat-recline-extra',
                                    size: 15,
                                    color: 'white'
                                }}
                                title='Check Availability'
                                buttonStyle={styles.btnstyle}

                                onPress={()=>navigate('Seats',{date:this.state.date,train:this.state.selected})}
                            />
                            
                            </View>
                        </View>







                    }
                </Card>
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