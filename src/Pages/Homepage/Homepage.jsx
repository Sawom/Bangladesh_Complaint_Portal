import React from 'react';
import Slides from './HomeComponent/Slides';
import Faqs from './HomeComponent/Faqs';
import Problems from './HomeComponent/Problems';

const Homepage = () => {
    return (
        <div>
           <Slides></Slides>
           <Problems></Problems>
           <Faqs></Faqs> 
        </div>
    );
};

export default Homepage;