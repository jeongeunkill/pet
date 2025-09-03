import React from 'react';
import Mainslider from '../components/Mainslider';
import Best from '../components/Best';
import Fresh from '../components/Fresh';
import Location from '../components/Location';

const Home = () => {
    return (
        <div className="home">
            <Mainslider />
            <Best />
            <Fresh />
            <Location />
        </div>
    );
};

export default Home;
