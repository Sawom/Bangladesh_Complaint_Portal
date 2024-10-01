import React from 'react';
import Slides from './HomeComponent/Slides';
import Faqs from './HomeComponent/Faqs';
import Problems from './HomeComponent/Problems';
import ShowReview from './HomeComponent/ShowReview';

const Homepage = () => {
    return (
        <div>
           <Slides></Slides>
           <Problems></Problems>
           <Faqs></Faqs> 
           <ShowReview></ShowReview>
        </div>
    );
};

export default Homepage;