import React, {Component} from 'react';
import {View, Image, Text, TextInput, ActivityIndicator} from 'react-native';
import fetch from 'react-native-fetch-polyfill';

import styles from './styles/loginStyle';
import {LOGIN} from "./styles/common";
import MyButton from './button';

export default class LoginPage extends Component {
    state = {
        SERVER : this.props.server,
        text: 'Type your name...',
        entered: false,
    };

    _onLoginPress = (mode: string) => {
        if(this.state.text.trim()==='' || this.state.text === 'Type your name...') {
            this.setState({
                text: '',
            });
            alert("Please enter your name!");
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
                alert("Can't connect to Server");
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
        }else
        return (
            this.renderPage()
        );
    }
}