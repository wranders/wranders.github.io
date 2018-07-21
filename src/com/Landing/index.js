import React from 'react';
import Particles  from 'react-particles-js';
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
            />
            <Particles 
                params={{
                    particles: {
                        number: {
                            value: 80
                        },
        			    line_linked: {
                            enable: true,
                            distance: '150',
                            color: '#ffffff',
                            opacity: '0.1',
                            width: '1'
                        },
                        move: {
                            enable: true,
                            speed: 1
                        }
                    }
                }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                }}
            />
            </div>
        );
    }
}

export default Landing;