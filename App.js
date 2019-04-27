import React, {Component} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import fetch from 'react-native-fetch-polyfill';
import firebase from 'react-native-firebase';
import type {Notification, NotificationOpen} from 'react-native-firebase';

import {handleAndroidBackButton} from './components/modules/androidBackButton';
import {quitAlert} from './components/modules/alert';
import {_cantConnect} from "./components/modules/cantConnect";
import styles from './components/styles/styles';
import Article from './components/article';
import ArticlePage from './components/articlePage';
import Header from './components/header';
import LoginPage from './components/loginPage';
import AsyncStorage from "@react-native-community/async-storage";

const SERVER = `http://10.0.2.2:3000`;
//const SERVER = `http://192.168.137.1:3000`;

type Props = {};
export default class App extends Component<Props> {
    state = {
        category: undefined,
        selected: undefined,
        page: Number,
    };

    constructor(props) {
        super(props);
        this.state = {
            openArticle: true,
            refreshing: false,
            isLoading: true,
            showArticle: false,
            page: 1,
            jsonObj: {},
        }
    }

    componentWillMount() {
        // Build a notification channel
        const channel = new firebase.notifications.Android.Channel(
            'notif',
            'Notifications Channel',
            firebase.notifications.Android.Importance.Max
        ).setDescription('Iliria Mobile app Notification channel');

        firebase.notifications().android.createChannel(channel);
    }

    componentDidMount() {
        handleAndroidBackButton(this.handleBackPress);

        firebase.messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    console.log('permissions Granted.');
                } else {
                    console.log('i dont have permissions');
                }
            });

        firebase.messaging().subscribeToTopic('news');

        //THIS Notification RUNS ON BACKGROUND!
        firebase.notifications().getInitialNotification()
            .then((notificationOpen: NotificationOpen) => {
                if (notificationOpen) {
                    this.setState({
                        selected: notificationOpen.notification._data.id,
                        initialNotification: true,
                    });
                }
            });

        //THIS Notification RUNS ON FOREGROUND!
        firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {

            if (this.state.showArticle)
                this.setState({showArticle: false});

            this.setState({
                selected: notificationOpen.notification._data.id,
                showArticle: true,
            });
        });

        //THIS IS A NOTIFICATION LISTENER IN FOREGROUND
        firebase.notifications().onNotification((ntf: Notification) => {
            const notification = new firebase.notifications.Notification()
                .setNotificationId(ntf.notificationId)
                .setTitle(ntf.title)
                .setBody(ntf.body)
                .setData(ntf.data)
                .android.setChannelId('notif')
                .android.setAutoCancel(true)
                .android.setClickAction('android.intent.action.MAIN');

            firebase.notifications().displayNotification(notification);
        });
    }

    handleBackPress = () => {
        if (this.state.showArticle)
            this.setState({
                showArticle: false,
            });
        else
            quitAlert();
    };

    _onLogin = (username: string) => {
        if (this.state.initialNotification) {
            this.setState({
                showArticle: true,
                initialNotification: false,
            });
        }
        try {
            AsyncStorage.setItem('@userName', username);
        } catch (e) {
            console.log('Saving error:', e);
        }
        fetch(`${SERVER}/api/articles/?page=${this.state.page}`, {timeout: 5 * 1000})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    jsonObj: responseJson,
                    isLoading: false,
                    username: username,
                });
            })
            .catch((error) => {
                _cantConnect();
            });
    };

    _keyExtractor = (item) => item._id;

    _onRefresh = () => {
        this.state.page = 1;
        this.setState({
            refreshing: true,
        });

        let fetchURL = `${SERVER}/api/articles/?page=`;
        if (this.state.category)
            fetchURL = `${SERVER}/api/categories/${this.state.category}/?page=`;

        fetch(`${fetchURL}${this.state.page}`, {timeout: 5 * 1000})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    refreshing: false,
                    jsonObj: responseJson,
                });
            })
            .catch((error) => {
                _cantConnect();
            });
        setTimeout(() => this.setState({
            refreshing: false,
        }), 7 * 1000)
    };

    _onPressHome = () => {
        if (this.state.category === undefined)
            this.flatListRef.scrollToIndex({animated: true, index: 0});
        else {
            this.state.page = 1;

            let fetchURL = `${SERVER}/api/articles/?page=`;

            fetch(`${fetchURL}${this.state.page}`, {timeout: 5 * 1000})
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        jsonObj: responseJson,
                        category: undefined,
                    });
                })
                .catch((error) => {
                    _cantConnect();
                });
        }
    };

    _onPressItem = (id: string) => {
        this.setState({
            selected: id,
            showArticle: true,
        });
    };

    _categoryPress = (title: string) => {
        this.state.json = {};
        this.state.page = 1;
        this.loadCategoryArticles(title);
        this.setState({
            category: title,
        });
    };

    loadCategoryArticles = (title: string) => {
        fetch(`${SERVER}/api/categories/${title}/?page=${this.state.page}`, {timeout: 5 * 1000})
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    jsonObj: responseJson,
                });
            })
            .catch((error) => {
                _cantConnect();
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
            date={item.date.toString().substring(0, 10)}
            views={item.views}
        />
    );

    scrollFix = false;

    loadMore = () => {
        let fetchURL = `${SERVER}/api/articles/?page=`;
        if (this.state.category)
            fetchURL = `${SERVER}/api/categories/${this.state.category}/?page=`;

        if (!this.scrollFix) {
            this.scrollFix = true;
            let nextPage = this.state.page + 1;

            fetch(`${fetchURL}${nextPage}`, {timeout: 5 * 1000})
                .then((response) => response.json())
                .then((responseJson) => {
                    let nextObj = [...this.state.jsonObj];
                    nextObj.push(...responseJson);
                    this.setState({
                        jsonObj: nextObj,
                        page: nextPage,
                    });
                })
                .catch((error) => {
                    _cantConnect();
                });
        } else {
            this.scrollFix = false;
        }
    };

    render() {
        if (this.state.isLoading) {
            return (
                <LoginPage onLogin={this._onLogin} server={SERVER}/>
            )
        }

        if (this.state.showArticle) {
            return (
                <ArticlePage
                    user={this.state.username}
                    style={styles.body}
                    id={this.state.selected}
                    server={SERVER}
                />
            );
        }

        return (
            <View style={styles.body}>
                <View style={styles.header}>
                    <Header server={SERVER} onPressItem={this._categoryPress} onPressHome={this._onPressHome}/>
                </View>
                <FlatList
                    ref={(ref) => {
                        this.flatListRef = ref;
                    }}
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
