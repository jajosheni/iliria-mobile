import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles'

export default class MyButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.onPress}>
                    <View style={this.props.style}>
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}