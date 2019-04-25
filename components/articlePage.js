import React, {Component} from 'react';
import fetch from 'react-native-fetch-polyfill';
import {Image, View, Text, ScrollView} from 'react-native';
import styles from './styles/articleStyle';
import MyButton from './button';
import {_cantConnect} from "./modules/cantConnect";

export default class ArticlePage extends Component {
    state = {
        id : this.props.id,
        SERVER : this.props.server,
        user : this.props.user,
        isLoaded : false,
        views: [],
        likes: [],
        dislikes: [],
    };

    _updateLists = (mode: string) => {
        //If liked/disliked remove the like/dislike on counterAction
        if(mode==='like'){
            if(this.state.dislikes.includes(this.state.user))
                this.state.dislikes.splice(
                    this.state.dislikes.findIndex((elem) => elem === this.state.user),
                    1
                );
            this.state.likes.push(this.state.user);
            this.setState({
                liked: true,
                disliked: false,
            });
        }else{
            if(this.state.likes.includes(this.state.user))
                this.state.likes.splice(
                    this.state.likes.findIndex((elem) => elem === this.state.user),
                    1
                );
            this.state.dislikes.push(this.state.user);
            this.setState({
                liked: false,
                disliked: true,
            });
        }
    };

    loadArticle = () => {
        let articleURL = `${this.state.SERVER}/api/articles/${this.state.id}`;
        fetch(articleURL, {timeout: 5*1000})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    source : `${this.state.SERVER}/images/${responseJson.image_url}` || '#',
                    title : responseJson.title || 'Missing Title',
                    content : responseJson.content || 'No content',
                    category : responseJson.category || 'No category',
                    date : responseJson.date.toString().substring(0,10) || '01-01-1970',
                    views : responseJson.views || [],
                    likes : responseJson.likes || [],
                    dislikes : responseJson.dislikes || [],
                    isLoaded: true,
                });
            }).then((test) => {
                this.setState({
                    liked : this.state.likes.includes(this.state.user),
                    disliked: this.state.dislikes.includes(this.state.user),
                });
        }).catch((error) => {
            _cantConnect();
            });

        //UPDATE VIEWS
        let form = new FormData();
        form.append("user", this.state.user);

        fetch(articleURL, {
            method: 'PUT',
            body: form,
            timeout: 5 * 1000,
        }).catch((error) => {
            _cantConnect();
        });
    };

    _onLikeDislike = (mode: string) => {
        let articleURL = `${this.state.SERVER}/api/articles/${this.state.id}`;

        this._updateLists(mode);

        let form = new FormData();
        form.append("user", this.state.user);
        form.append(mode, mode);


        fetch(articleURL, {
            method: 'PUT',
            body: form,
            timeout: 3 * 1000,
        }).catch((error) => {
            _cantConnect();
        });
    };

    _didLike = () => {
        let txt = this.state.liked ? 'Liked' : 'Like';
        return `${txt} (${this.state.likes.length})`;
    };

    _didDislike = () => {
        let txt = this.state.disliked ? 'Disliked' : 'Dislike';
        return `${txt} (${this.state.dislikes.length})`
    };

    renderArticle = () => {
      return(
          <View style={styles.body}>
              <View style={styles.header}>
                    <Text style={styles.title} numberOfLines={2}>{this.state.title}</Text>
              </View>
              <View style={styles.underBlock}>
                  <Text style={styles.text}>Views: {this.state.views.length}</Text>
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
                  <MyButton onPress={this._onLikeDislike} mode={'like'} title={this._didLike()}/>
                  <MyButton onPress={this._onLikeDislike} mode={'dislike'} title={this._didDislike()}/>
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