import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Toast from 'react-native-simple-toast';



var houseSelected;

export default class ScreenNavigator extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showRealApp: false,
            selected: ''
        }

    }

    componentDidMount() {

        houseSelected = this.props.route.params.site1;

        AsyncStorage.setItem('house', JSON.stringify(houseSelected));

        if (houseSelected === 'HAR') {

            //this.props.navigation.navigate('GerSite');


        } else if (houseSelected === 'GER') {

            this.props.navigation.navigate('GerSite');

        } else if (houseSelected === 'OHA') {

            //this.props.navigation.navigate('GerSite');


        } else if (houseSelected === 'REP') {

            //this.props.navigation.navigate('GerSite');




        }else {

        }



    }




    render() {

        return (

            <View style={styles.container}>




            </View>
        )


    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebeb'
    },

   
})


