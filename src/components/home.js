import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';
import hoverEffect from 'hover-effect';
import image1 from '../assets/splash1.jpg';
import image2 from '../assets/splash2.jpg';
import displacementImage from '../assets/dot.jpg';

const styles = {
    root: {
        display: "flex",
        flexDirection: "row",
        minHeight: 600,
        '& .home-info': {
            flex: 1
        },
        '& .home-splash': {
            flex: 1
        }
    }
};

const Home = ({ classes }) => {

    useEffect(() => {
        const animation = new hoverEffect({
            parent: document.querySelector(".home-splash"),
            image1: image1,
            image2: image2,
            speedIn: 1,
            speedOut: 0.7,
            angle2: Math.PI / 2,
            intensity1: 0.1,
            intensity2: 0.1,
            displacementImage: displacementImage
        });
    }, []);

    return (
        <div className={classes.root}>
            <div className="home-info">
            </div>
            <div className="home-splash"></div>
        </div>
    );
}

export default withStyles(styles)(Home);
