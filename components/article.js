import React, {Component} from 'react';
import {Image,TouchableOpacity, View, Text} from 'react-native';
import styles from './styles/styles';
import {HOME, VIEW} from "./styles/common";

export default class MyArticle extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };
    render() {
        let props = {
            source: this.props.source || '#',
            title: this.props.title || 'Missing Title',
            content: this.props.content || 'No content',
            category: this.props.category || 'No category',
            date: this.props.date || '01-01-1970',
            views: this.props.views || [],
        };
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.aImage} source={{uri: props.source}}/>
                    </View>
                    <View style={styles.articleCard}>
                        <Text style={styles.aTitle} numberOfLines={1}>{props.title}</Text>
                        <Text style={styles.text} numberOfLines={1}>{props.content}</Text>
                        <View style={styles.aCategoryDate}>
                            <Text style={styles.text} numberOfLines={1}>{props.category}</Text>
                            <Text style={styles.text} numberOfLines={1}>{props.date}</Text>
                            <View style={styles.views}>
                                <Text  numberOfLines={1} style={{...styles.text, fontSize: 10}}>{props.views.length}</Text>
                                <Image style={styles.img} source={VIEW}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}