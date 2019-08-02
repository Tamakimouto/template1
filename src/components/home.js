import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/styles';

import hoverEffect from 'hover-effect';
import image1 from '../assets/knoxvilled.jpg';
import image2 from '../assets/knoxvillen.jpg';
import displacementImage from '../assets/ramen.jpg';

import { TimelineLite } from 'gsap/all';

const styles = {
    root: {
        display: "flex",
        flexDirection: "row",
        padding: 18,
        backgroundColor: '#d5d2d1',
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        '& .home-splash': {
            flex: 1,
            width: "90vw",
            height: "45vw",
            maxWidth: 1900,
            maxHeight: 950,
            mixBlendMode: "multiply"
        },
        '& .home-info': {
            position: "absolute",
            bottom: 18,
            left: 18,
            padding: 12,
            textAlign: "left",
            overflow: "visible",
            '& h1': {
                color: "#e3e3e3",
                fontSize: 62,
                marginBottom: 8,
                marginTop: 0,
                textTransform: "uppercase",
                mixBlendMode: "hard-light"
            },
            '& span': {
                color: '#e3e3e3',
                fontSize: 20,
                textTransform: "uppercase",
                paddingLeft: 3,
                display: "block"
            },
            '& .hiddenSpan': {
                opacity: 0,
                display: "none"
            }
        }
    }
};

const Home = ({ classes }) => {

    let title, subtitle1, subtitle2;

    const introAnimation = new TimelineLite({ paused: true });
    const hoverAnimation = new TimelineLite({ paused: true });
    const [loaded, toggleLoaded] = useState(false);

    useEffect(() => {
        introAnimation
            .from(title, 1, {delay: 0.5, opacity: 0})
            .fromTo(subtitle1, 0.5, {opacity: 0, yPercent: -150}, {opacity: 1, yPercent: 0});
        initializeImage(() => introAnimation.play());

        toggleLoaded(true);

        window.addEventListener('resize', initializeImage);
        return () => {
            window.removeEventListener('resize', initializeImage);
        }
    });

    const initializeImage = (cb) => {
        const box = document.querySelector(".home-splash");
        box.innerHTML = "";

        new hoverEffect({
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

        if (!loaded && cb) {
            cb();
        }
    }

    const handleHover = () => {
        hoverAnimation
            .to(subtitle1, 0.2, { opacity: 0, yPercent: -50, display: "none" })
            .fromTo(subtitle2, 0.3, {opacity: 0, yPercent: 50, display: "none"}, {opacity: 1, yPercent: 0, display: "block"});
        hoverAnimation.play();
    }

    const handleUnhover = () => {
        hoverAnimation
            .to(subtitle2, 0.2, {opacity: 0, yPercent: 50, display: "none"})
            .fromTo(subtitle1, 0.3, {opacity: 0, yPercent: -50, display: "none"}, {opacity: 1, yPercent: 0, display: "block"});
        hoverAnimation.play();
    }

    return (
        <div className={classes.root}>
            <div className="home-splash" onMouseEnter={handleHover} onMouseLeave={handleUnhover}></div>
            <div className="home-info">
                <span ref={ref => subtitle1 = ref}>Former capital of Tennessee</span>
                <span ref={ref => subtitle2 = ref} className="hiddenSpan">Knox Vegas</span>
                <h1 ref={ref => title = ref}>Knoxville</h1>
            </div>
        </div>
    );
}

export default withStyles(styles)(Home);
