import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import '../../assets/style/map/googleMap.scss';

function App() {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    useEffect(() => {
        navigator.geolocation.watchPosition((position) => {
            setLat(Number(position.coords.latitude));
            setLng(Number(position.coords.longitude));
        });
    }, [lat, lng]);

    return (
        <>
            { lat === null && <div><Spin tip="Loading..." /></div>}
            { lat !== null &&
                <div className="google-map">
                    <iframe className="iframe" src={`https://www.google.com/maps/embed/v1/search?key=AIzaSyA93EqfOkICl0lzRjq3Zb5bNRWFriWzlfE&center=${lat},${lng}&zoom=13&q=收容所`}>
                    </iframe>
                </div>
            }
        </>
    );
}

export default App;