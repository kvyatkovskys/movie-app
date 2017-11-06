import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, Dimensions } from 'react-native';

let width = Dimensions.get('window').width;
const ROWS_IN_DATA_SOURCE = 10;
const dataSource = [];
for (let i=0; i<ROWS_IN_DATA_SOURCE; i++) dataSource.push(`This is the data for row # ${i+1}`);

class MovieController extends Component {
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(dataSource),
            db: dataSource,
        }
    }

    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <View style={styles.rowContainer}>
                    <Text> {rowData} </Text>
                </View>
            </View>
        );
    }

    render() {
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

export default MovieController;

let styles = StyleSheet.create({
    table: {
        flex: 1,
        backgroundColor: 'white',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        height: 300,
    },
    rowContainer: {
        flex: .9,
        justifyContent: 'center',
        height: 290,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        shadowOpacity: 0.75,
        shadowRadius: 10,
        shadowColor: 'lightgrey',
    }
});