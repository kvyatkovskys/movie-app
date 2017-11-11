import React, { Component } from 'react';
import ApiKey from './ApiKey';

class APIHandler extends Component {
    loadDiscoverMovie = (page) => {
        return fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ ApiKey.key +'&language=en-US&sort_by=popularity.desc&page=' + page)
            .then((response) => response.json())
            .catch((error) => {
                console.error(error)
            })
    }
}

export default APIHandler;