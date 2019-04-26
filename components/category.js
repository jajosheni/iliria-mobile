import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles/categoryStyle';

export default class MyCategory extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.title);
    };

    render() {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.category}>
                    <Text style={styles.text} numberOfLines={1}>{this.props.title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}
