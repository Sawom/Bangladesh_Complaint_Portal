import React, { useEffect, useState } from 'react';
import Hotlines from './Hotlines';

const LoadHotlines = () => {
    const [numbers, setNumbers] = useState([]);

    useEffect( ()=>{
        fetch('http://localhost:5000/hotlines')
        .then( res => res.json())
        .then( (data)=>{
            setNumbers(data)
        } )
    }, [] )

    return (
        <div style={{ backgroundColor: "#E5E5E5" }}>
            
            {/* load hotlines */}
            <div className='container mx-auto' >
                {
                    numbers.map( (numbersInfo)=> <Hotlines 
                    key={ numbersInfo._id } numbersInfo={numbersInfo} ></Hotlines>  )
                }
            </div>

        </div>
    );
};

export default LoadHotlines;