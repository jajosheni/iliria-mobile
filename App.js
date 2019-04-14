import React, {Component} from 'react';
import {ActivityIndicator, FlatList, View} from 'react-native';
import styles from './components/styles';
import Article from './components/article';
import header from './components/header';

const SERVER = `http://10.0.2.2:3000`;

type Props = {};
export default class App extends Component<Props> {
    state = {
        selected: undefined,
        page: Number,
    };
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            page: 1,
            jsonObj: {},
        }
    }
    componentDidMount(){
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

    _keyExtractor = (item, index) => item._id;

    _onPressItem = (id: string) => {
        this.setState((state) => {
            return {selected: id};
        });
        console.log(this.state.selected)
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
        />
    );

    scrollFix = false;

    loadMore = () => {
        if(!this.scrollFix) {
            this.scrollFix = true;
            let nextPage = this.state.page + 1;
            fetch(`${SERVER}/api/articles/?page=${nextPage}`)
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
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return(
            <View style={styles.body}>
                <FlatList
                    style={styles.flatlist}
                    data={[...this.state.jsonObj]}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ListHeaderComponent={header}
                    ListHeaderComponentStyle={styles.header}
                    onEndReached={this.loadMore}
                    onEndReachedThreshold={0.1}
                    refreshing={true}
                />
            </View>
        );
    }
}
