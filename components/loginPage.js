import React, {Component} from 'react';
import {View, Image, Text, TextInput, ActivityIndicator, ToastAndroid} from 'react-native';
import fetch from 'react-native-fetch-polyfill';
import {_cantConnect} from "./modules/cantConnect";
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles/loginStyle';
import {LOGIN} from "./styles/common";
import MyButton from './button';

export default class LoginPage extends Component {
    state = {
        SERVER : this.props.server,
        text: 'Type your name...',
        entered: false,
        userLoad: true,
    };

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@userName');
            if(value !== null) {
                this.setState({
                    text: value,
                });
            }
        } catch(e) {
          ToastAndroid.showWithGravity(
            "Welcome to Iliria Newsletter",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
    };

    _onLoginPress = (mode: string) => {
        if(this.state.text.trim()==='' || this.state.text === 'Type your name...') {
            this.setState({
                text: '',
            });
            ToastAndroid.showWithGravityAndOffset(
                'Please enter your username...',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                0,
                150,
            );
        }
        else{
            this.setState({
                loading: true,
            });

            fetch(`${this.state.SERVER}/api/users`, {
                method: 'POST',
                timeout: 5 * 1000,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: this.state.text.trim().toLowerCase(),
                }),
            }).then((response) => {
                this.props.onLogin(this.state.text.trim().toLowerCase());
            }).catch((error) => {
                _cantConnect();
                this.setState({
                    loading: false,
                });
            });
        }
    };

    _inputChange = (text:string) => {
        this.setState({
            text: text,
        });
    };

    _onFocus = () => {
        if(!this.state.entered) {
            this.setState({
                text: '',
                entered: true,
            });
        }
    };

    renderPage = () => {
        if(this.state.userLoad) {
            this.state.userLoad = false;
            this.getData();
        }
        return(
            <View style={styles.body}>
                <View style={styles.upper}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.img} source={LOGIN}/>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text}>{"İliria"}</Text>
                    </View>
                </View>
                <View style={styles.lower}>
                    <TextInput
                        style={styles.input}
                        onChangeText={this._inputChange}
                        onFocus={this._onFocus}
                        value={this.state.text}
                    />
                    <MyButton onPress={this._onLoginPress} mode={'login'} title={"Login"}/>
                </View>
            </View>
        );
    };

    render() {
        if(this.state.loading){
            return (
                <View style={styles.loading}>
                    <ActivityIndicator color={'#000'}/>
                </View>
            );
        }else return (
            this.renderPage()
        );
    }
}
