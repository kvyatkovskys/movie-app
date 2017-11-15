import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Image, findNodeHandle, Platform, InteractionManager } from 'react-native';
import APIHandler from '../APIHandler';
import Rating from 'react-native-star-rating';

export default class MovieController extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props){
        super(props);
        apiHandler = new APIHandler();
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            isLoading: true,
            selectedIndex: -1,
            page: 0,
            dataSource: this.ds.cloneWithRows([]),
            items: [],
        };

        this.updateIndex = this.updateIndex.bind(this);
        this.loadMoreDiscover = this.loadMoreDiscover.bind(this);
    }

    // select button in header view
    updateIndex (selectedIndex) {
        this.setState({
            selectedIndex: selectedIndex
        });
    }

    // load more movies
    loadMoreDiscover () {
        apiHandler.loadDiscoverMovie(this.state.page + 1)
            .then((responseJson) => {
                let newItems = this.state.items.concat(responseJson.results);
                this.setState ({
                    page: this.state.page + 1,
                    items: newItems,
                    dataSource: this.ds.cloneWithRows(newItems)
                });
        });
    }

    componentDidMount () {
        apiHandler.loadDiscoverMovie(1)
            .then((responseJson) => {
                this.setState ({
                    isLoading: false,
                    dataSource: this.ds.cloneWithRows(responseJson.results),
                    items: responseJson.results,
                    page: 1
                });
        });
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.rowContainer}>
                    <Image style={styles.image}
                        source={{ uri: 'https://image.tmdb.org/t/p/w500' + rowData.backdrop_path }}/>
                    <View style={styles.backView}/>
                    <View style={{position: 'absolute', top: 20, right: 20}}>
                        <Rating
                            disabled={true}
                            maxStars={5}
                            rating={rowData.vote_average/2}
                            emptyStarColor={'white'}
                            starSize={15}
                            starColor={'white'}
                            starStyle={{backgroundColor: 'transparent'}}/>
                    </View>
                    <View style={styles.columnView}>
                        <Image style={styles.imagePoster}
                               source={{ uri: 'https://image.tmdb.org/t/p/w500' + rowData.poster_path }}/>
                        <Text style={styles.title}>{rowData.title}</Text>
                        <Text numberOfLines={rowData.overview.length > 285 ? (rowData.title.length >= 21 ? 4 : 6) : 6} style={styles.description}>
                            {rowData.overview}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const { navigate } = this.props.navigation;

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 200}}>
                    <ActivityIndicator size="large"/>
                </View>
            );
        }

        return (
            <View style={styles.table}>
                <View style={styles.buttonGroup}>
                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Genre
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Sort
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Year
                        </Text>
                    </View>

                    <View style={styles.button}>
                        <Text style={styles.textButton}>
                            Serials
                        </Text>
                    </View>
                </View>

                <ListView
                    style={{marginTop: 25}}
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadMoreDiscover}/>
            </View>
        );
    }
}

let styles = StyleSheet.create({
    table: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        margin: 10,
        height: 400,
    },
    rowContainer: {
        height: 400,
        borderRadius: 5,
        ...Platform.select({
            ios: {
                backgroundColor: 'white',
                shadowOpacity: 0.75,
                shadowRadius: 5,
                shadowColor: 'black',
                shadowOffset: {
                    width: 2,
                    height: 5
                },
            },
            android: {
                backgroundColor: 'black',
                elevation: 10,
            }
        }),
    },
    image: {
        flex: 1,
        borderRadius: 5,
    },
    absolute: {
        position: 'absolute',
        borderRadius: 5,
        top: 0, left: 0, bottom: 0, right: 0,
    },
    backView: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'black',
        borderRadius: 5,
        opacity: 0.6
    },
    columnView: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        top: 0, left: 0, bottom: 0, right: 0,
    },
    rate: {
        position: 'absolute',
        top: 20, right: 20,
    },
    imagePoster: {
        margin: 20,
        height: 180,
        width: 120,
        borderRadius: 5,
    },
    title: {
        marginBottom: 20, marginLeft: 20, marginRight: 20,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
    description: {
        flex: 1,
        textAlign: 'left',
        marginBottom: 20, marginLeft: 20, marginRight: 20,
        fontSize: 14,
        color: 'white',
        backgroundColor: 'transparent',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        ...Platform.select({
            ios: {
                paddingTop: 40, paddingBottom: 20,
            },
            android: {
                paddingTop: 30, paddingBottom: 30,
            },
        }),
        height: 60,
    },
    button: {
        height:30, minWidth: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black',
    },
    textButton: {
        color: 'black',
        fontSize: 15,
    },
});