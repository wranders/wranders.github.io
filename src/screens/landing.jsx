import React from 'react';
import Image from 'com/Image';
import Logo from 'img/doubleu_logo.png';

import './landing.css';

const Landing = () => {
    return(
        <div>
            <Image img={Logo} class="logo" alt="DoUbleU Logo"/>
        </div>
    )
}

export default Landing;