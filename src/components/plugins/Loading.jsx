import React from 'react';
import { Hypnosis } from "react-cssfx-loading";
import '../plugins/Plugins.css';

const Loading = () => {
    return (
        <div className='loading'>
            <div className='container'>
                <div className='loaderIcon'><Hypnosis height='100px' width='100px' color='rgb(23, 203, 155)' duration="1.5s" /></div>
            </div>
        </div>
    )
}

export default Loading;