import React from 'react';
import Particles  from 'react-particles-js';

class Header extends React.Component {
    render() {
        return (
            <Particles 
                params={{
                    particles: {
                        number: {
                            value: 80
                        },
        			    line_linked: {
              				shadow: {
           					    enable: true,
           					    color: "#3CA9D1",
           					    blur: 5
           				    }
                        },
                        move: {
                            enable: true,
                            speed: 6
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
        );
    }
}

export default Header;