import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ActivityIndicator, Image } from 'react-native';
import APIHandler from "../APIHandler";

export default class MovieController extends Component {
    constructor(props){
        super(props);
        apiHandler = new APIHandler();

        this.state = {
            isLoading: true,
        }
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
                    <Text style={styles.text}>{rowData.title}</Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 30}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={styles.table}>
                <ListView
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
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        height: 300,
    },
    rowContainer: {
        flex: .9,
        flexDirection: 'row',
        justifyContent: 'center',
        height: 290,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 10
        },
    },
    image: {
        flex: 1,
        borderRadius: 5,
    },
    text: {
        textAlign: 'center',
        position: 'absolute',
        top: 10,
        right: 10,
        left: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'transparent',
    },
});