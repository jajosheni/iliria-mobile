import React, {Component} from 'react';
import {Image, View, Text, ScrollView} from 'react-native';
import styles from './styles/articleStyle';
import MyButton from './button';

export default class ArticlePage extends Component {
    state = {
        id : this.props.id,
        SERVER : this.props.server,
        isLoaded : false,
    };

    loadArticle = () => {
        fetch(`${this.state.SERVER}/api/articles/${this.state.id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    source : `${this.state.SERVER}/images/${responseJson.image_url}` || '#',
                    title : responseJson.title || 'Missing Title',
                    content : responseJson.content || 'No content',
                    category : responseJson.category || 'No category',
                    date : responseJson.date.toString().substring(0,10) || '01-01-1970',
                    views : responseJson.views || 0,
                    likes : responseJson.likes || 0,
                    dislikes : responseJson.dislikes || 0,
                    isLoaded: true,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    _onPressItem = (mode: string) => {
        this.setState({
            selected: mode,
        });
        console.log(this.state.selected, this.state.id);
    };

    renderArticle = () => {
      return(
          <View style={styles.body}>
              <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={2}>{this.state.title}</Text>
              </View>
              <View style={styles.underBlock}>
                  <Text style={styles.text}>Views: {this.state.views}</Text>
                  <Text style={styles.text}>{this.state.category}</Text>
                  <Text style={styles.text}>{this.state.date}</Text>
              </View>
              <ScrollView>
                  <View style={styles.imgContainer}>
                      <Image style={styles.img} source={{uri: this.state.source}}/>
                  </View>
                  <View style={styles.content}>
                      <Text style={styles.text}>{this.state.content}</Text>
                  </View>
              </ScrollView>
              <View style={styles.underBlock}>
                  <MyButton onPress={this._onPressItem} mode={'like'} title={`Like (${this.state.likes})`}/>
                  <MyButton onPress={this._onPressItem} mode={'dislike'} title={`Dislike (${this.state.dislikes})`}/>
              </View>
          </View>
      );
    };

    render() {
        if(!this.state.isLoaded)
            this.loadArticle();
        return (
            this.renderArticle()
        );
    }
}