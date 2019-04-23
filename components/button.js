import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles/styles'

export default class MyButton extends Component {
    _onPress = () => {
        this.props.onPress(this.props.mode);
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._onPress}>
                    <View style={styles.button}>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}