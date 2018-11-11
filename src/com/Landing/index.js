import React from 'react';
import Image from 'com/Image'
import DoubleuLogo from 'img/doubleu_logo.png';

const Landing = () => {
    return(
        <div>
            <Image 
            img={DoubleuLogo} 
            style={{
                position: 'fixed', 
                top: '20%', 
                left: '50%', 
                marginRight: '-50%', 
                transform: 'translate(-50%, -50%)', 
                width: '20vh', 
                border: '0.1em solid #ddd', 
                borderRadius: '25%'
            }} 
            alt="DoUbleU Logo"/>
        </div>
    )
};

export default Landing;