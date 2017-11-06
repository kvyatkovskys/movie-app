const apiKey = 'b267479de0cb68f21ed30c5494e8bfac';
import React, { Component } from 'react';

class APIHandler extends Component {
    loadDiscoverMovie=()=> {
        return fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ apiKey +'&language=en-US&sort_by=popularity.desc')
            .then((response) => response.json())
            .catch((error) => {
                console.error(error)
            })
    }
}

export default APIHandler;