import React from 'react';
import { Image, StyleSheet, View, Platform } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MovieController from './Controllers/MovieController';
import SettingsController from './Controllers/SettingsController';

// navigator for Settings controller
export const SettingsStack = StackNavigator({
    Settings: {
        screen: SettingsController,
        navigationOptions: {
            title: 'Settings'
        }
    }
});

// navigator for Movie controller
export const MovieStack = StackNavigator({
    Movie: {
        screen: MovieController,
    }
});

// tab bar controller
export const Tabs = TabNavigator({
    Movie: {
        screen: MovieStack,
        navigationOptions: {
            tabBarLabel: 'Movies',
            tabBarIcon: ({tintColor}) =>
                <View style={styles.view}>
                    <Image
                        source={require('./Images/ic_movie.png')}
                        style={[styles.icon, {tintColor: tintColor}]}/>
                </View>
        },
    },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) =>
                <Icon
                    name='settings'
                    size={25}
                    color={tintColor}
                />
        },
    },
}, {
    animationEnabled: true,
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
        ...Platform.select({
            ios: {

            },
            android: {
                pressColor: 'black',
                labelStyle: {
                    color: 'gray',
                },
                style: {
                    backgroundColor: 'white',
                },
                indicatorStyle: {
                    backgroundColor: 'black',
                },
            },
        }),
        activeTintColor: 'black',
    },
});

// root controller
export const Root = StackNavigator({
    Tabs: {
        screen: Tabs,
    },
}, {
    mode: 'modal',
    headerMode: 'none',
});

let styles = StyleSheet.create({
    icon: {
        height: 25,
        width: 25
    },
    view: {
        margin: -13,
    },
});