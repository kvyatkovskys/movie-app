import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Image } from 'react-native';
import APIHandler from '../APIHandler';
import { BlurView } from 'react-native-blur';
import { ButtonGroup } from 'react-native-elements';
import Rating from 'react-native-star-rating';

const buttons = ['Genre', 'Sort'];

export default class MovieController extends Component {
    static navigationOptions = {
            header: null
    };

    constructor(props){
        super(props);
        apiHandler = new APIHandler();

        this.state = {
            isLoading: true,
            viewRef: null,
            selectedIndex: -1,
        };

        this.updateIndex = this.updateIndex.bind(this)
    }

    updateIndex (selectedIndex) {
        this.setState({
            selectedIndex: selectedIndex
        })
    }

    componentDidMount () {
        apiHandler.loadDiscoverMovie()
            .then((responseJson) => {
                let ds = new ListView.DataSource({
                    rowHasChanged: (r1, r2) => r1 !== r2
                });
                this.setState ({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.results),
                }, function () {
                    // new state
                });
        });

    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.rowContainer}>
                    <Image style={styles.image}
                           source={{ uri: 'https://image.tmdb.org/t/p/w500' + rowData.backdrop_path }} />
                    <BlurView style={styles.absolute}
                              viewRef={{ uri: 'https://image.tmdb.org/t/p/w500' + rowData.backdrop_path }}
                              blurType='dark'
                              blurAmount={3}
                    />
                    <View style={{position: 'absolute', top: 20, right: 20}}>
                        <Rating
                            disabled={true}
                            maxStars={5}
                            rating={rowData.vote_average/2}
                            emptyStarColor={'white'}
                            starSize={20}
                            starColor={'white'}
                            starStyle={{
                                backgroundColor: 'transparent',
                            }}
                        />
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
                <View style={{flex: 1, paddingTop: 30}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.table}>
                <ButtonGroup
                    containerBorderRadius={5}
                    selectedTextStyle={styles.textSelectedGroup}
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={styles.buttonGroup}/>

                <ListView
                    style={{marginTop: 25}}
                    renderRow={this.renderRow.bind(this)}
                    dataSource={this.state.dataSource}
                />
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
        left: 20,
        marginRight: 20,
        textAlign: 'left',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
    description: {
        flex: 1,
        textAlign: 'left',
        padding: 20,
        marginBottom: 20,
        fontSize: 14,
        color: 'white',
        backgroundColor: 'transparent',
    },
    buttonGroup: {
        top: 24,
        height: 30,
    },
    textSelectedGroup: {
        color: '#e91e63',
    },
});