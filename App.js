import React, {Component} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View, BackHandler} from 'react-native';
import {handleAndroidBackButton} from './components/modules/androidBackButton';
import {quitAlert} from './components/modules/alert';

import styles from './components/styles/styles';
import Article from './components/article';
import ArticlePage from './components/articlePage';
import Header from './components/header';

const SERVER = `http://10.0.2.2:3000`;

type Props = {};
export default class App extends Component<Props> {
    state = {
        category: undefined,
        selected: undefined,
        page: Number,
    };

    constructor(props){
        super(props);
        this.state ={
            refreshing: false,
            isLoading: true,
            showArticle: false,
            page: 1,
            jsonObj: {},
        }
    }

    componentDidMount(){
        handleAndroidBackButton(this.handleBackPress);

        return fetch(`${SERVER}/api/articles/?page=${this.state.page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    jsonObj: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    handleBackPress = () => {
        if(this.state.showArticle)
            this.setState({
                showArticle: false,
            });
        else
            quitAlert();
    };

    _keyExtractor = (item, index) => item._id;

    _onPressHome = () => {
        if(this.state.category===undefined)
            this.flatListRef.scrollToIndex({animated: true, index: 0});
        else {
            this.state.page = 1;

            let fetchURL = `${SERVER}/api/articles/?page=`;

            fetch(`${fetchURL}${this.state.page}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        jsonObj: responseJson,
                        category: undefined,
                    });
                })
                .catch((error) =>{
                    console.error(error);
                });
        }
    };

    _onPressItem = (id: string) => {
        this.setState({
            selected: id,
            showArticle: true,
        }, function(){

        });
    };

    _categoryPress = (title: string) => {
        this.state.json = {};
        this.state.page = 1;
        this.loadCategoryArticles(title);
        this.setState({
            category: title,
        })
    };

    loadCategoryArticles = (title: string) => {
        fetch(`${SERVER}/api/categories/${title}/?page=${this.state.page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    jsonObj: responseJson,
                });
            })
            .catch((error) =>{
                console.error(error);
            });
    };

    _renderItem = ({item}) => (
        <Article
            onPressItem={this._onPressItem}
            id={item._id}
            source={`${SERVER}/images/${item.image_url}`}
            title={item.title}
            content={item.content}
            category={item.category}
            date={item.date.toString().substring(0,10)}
            views={item.views}
        />
    );

    _onRefresh = () => {
        this.state.page = 1;
        this.setState({
            refreshing: true,
        });

        let fetchURL = `${SERVER}/api/articles/?page=`;
        if(this.state.category)
            fetchURL = `${SERVER}/api/categories/${this.state.category}/?page=`;

        fetch(`${fetchURL}${this.state.page}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    refreshing: false,
                    jsonObj: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    };

    scrollFix = false;

    loadMore = () => {
        let fetchURL = `${SERVER}/api/articles/?page=`;
        if(this.state.category)
            fetchURL = `${SERVER}/api/categories/${this.state.category}/?page=`;

        if(!this.scrollFix) {
            this.scrollFix = true;
            let nextPage = this.state.page + 1;
            fetch(`${fetchURL}${nextPage}`)
                .then((response) => response.json())
                .then((responseJson) => {
                    let nextObj = [...this.state.jsonObj];
                    nextObj.push(...responseJson);
                    this.setState({
                        jsonObj: nextObj,
                        page: nextPage,
                    }, function () {

                    });

                })
                .catch((error) => {
                    console.error(error);
                });
        }else{
            this.scrollFix = false;
        }
    };

    render(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading}>
                    <ActivityIndicator/>
                </View>
            )
        }

        if(this.state.showArticle){
            return(
                <ArticlePage
                    style={styles.body}
                    id={this.state.selected}
                    server={SERVER}
                />
            );
        }

        return(
            <View style={styles.body}>
                <View style={styles.header}>
                    <Header server={SERVER} onPressItem={this._categoryPress} onPressHome={this._onPressHome}/>
                </View>
                <FlatList
                    ref={(ref) => { this.flatListRef = ref; }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    style={styles.flatlist}
                    data={[...this.state.jsonObj]}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.2}
                    refreshing={true}
                />
            </View>
        );
    }
}
