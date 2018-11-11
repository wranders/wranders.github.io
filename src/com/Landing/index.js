import React from 'react';
import Logo from 'com/Landing/Logo'
import LandingLogo from './Logo/landing_logo.png';

class Landing extends React.Component {
    render() {
        return (
            <div>
            <Logo 
                img={LandingLogo}
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
                alt="DoUbleU Logo"
            />
            </div>
        );
    }
}

export default Landing;