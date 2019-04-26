import React, {Component} from 'react';
import fetch from 'react-native-fetch-polyfill';
import {View, ScrollView, Image, TouchableOpacity} from 'react-native';
import styles from './styles/categoryStyle';
import Category from './category';
import {HOME} from './styles/common';
import {_cantConnect} from "./modules/cantConnect";

export default class MyHeader extends Component {
    state = {
        SERVER : this.props.server,
        isLoaded : false,
        categories: [],
    };

    _onPress = (category: string) => {
        this.props.onPressItem(category);
    };

    _onPressHome = () => {
        this.props.onPressHome();
    };

    loadCategories = () => {
        fetch(`${this.state.SERVER}/api/categories`, {timeout: 5*1000})
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.categories = [];
                for(let eachCategory of responseJson){
                    this.state.categories.push(
                        <Category
                            key={eachCategory.category}
                            title={eachCategory.category}
                            onPressItem={this._onPress}
                    />);
                }
                this.setState({
                    isLoaded: true,
                });
            })
            .catch((error) => {
                _cantConnect();
            });
    };

    renderCategories = () => {
        return(
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressHome}>
                    <View style={styles.home}>
                        <Image style={styles.img} source={HOME}/>
                    </View>
                </TouchableOpacity>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {this.state.categories}
                </ScrollView>
            </View>
        );
    };

    render() {
        if(!this.state.isLoaded)
            this.loadCategories();
        return (
            this.renderCategories()
        );
    }
}
