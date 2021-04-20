import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    componentDidMount() {
        sessionStorage.clear();
        navigator.geolocation.watchPosition((position) => {
            console.log(this.position);
            sessionStorage.setItem('lat', position.coords.latitude);
            sessionStorage.setItem('long', position.coords.longitude);
        });
    }

    static defaultProps = {
        center: {
            lat: Number(sessionStorage.getItem('lat')),
            lng: Number(sessionStorage.getItem('long')),
        },
        zoom: 15,
    };

    render() {
        return (
        // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyA93EqfOkICl0lzRjq3Zb5bNRWFriWzlfE' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

function App() {
    return (
        <>
            <div className="App">
                <SimpleMap />
            </div>
        </>
    );
}

export default App;
