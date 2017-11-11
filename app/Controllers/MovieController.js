import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Image } from 'react-native';
import APIHandler from '../APIHandler';
import { BlurView } from 'react-native-blur';
import { ButtonGroup } from 'react-native-elements';
import Rating from 'react-native-star-rating';
import PopoverTooltip from 'react-native-popover-tooltip';

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
            viewRef: null,
            selectedIndex: -1,
            page: 0,
            dataSource: this.ds.cloneWithRows([]),
            items: []
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
                    <BlurView style={styles.absolute}
                              viewRef={{ uri: 'https://image.tmdb.org/t/p/w500' + rowData.backdrop_path }}
                              blurType='dark'
                              blurAmount={3}/>
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
                    <PopoverTooltip
                        buttonComponent={
                            <View style={styles.button}>
                                <Text style={{ color: '#e91e63', fontSize: 20 }}>
                                    Genre
                                </Text>
                            </View>
                        }
                        items={[
                            {
                                label: 'Item 1',
                                onPress: () => {}
                            },
                            {
                                label: 'Item 2',
                                onPress: () => {}
                            }]
                        }/>
                    <PopoverTooltip
                        buttonComponent={
                            <View style={styles.button}>
                                <Text style={{ color: '#e91e63', fontSize: 20 }}>
                                    Sort
                                </Text>
                            </View>
                        }
                        items={[
                            {
                                label: 'Item 1',
                                onPress: () => {}
                            },
                            {
                                label: 'Item 2',
                                onPress: () => {}
                            }]
                        }/>
                    <PopoverTooltip
                        buttonComponent={
                            <View style={styles.button}>
                                <Text style={{ color: '#e91e63', fontSize: 20 }}>
                                    Year
                                </Text>
                            </View>
                        }
                        items={[
                            {
                                label: 'Item 1',
                                onPress: () => {}
                            },
                            {
                                label: 'Item 2',
                                onPress: () => {}
                            }]
                        }/>
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
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 5
        },
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
        top: 24,
        height: 40,
    },
    button: {
        height:30, width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textSelectedGroup: {
        color: '#e91e63',
    },
});