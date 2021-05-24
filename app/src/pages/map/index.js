import { useState } from 'react';
import SelectForm from '../../components/map/selectForm';
import GoogleMap from '../../components/map/googleMap';

function Map() {
    const [area, setArea] = useState(null);

    const getSelectArea = (selectArea) => {
        setArea(selectArea);
    };

    return (
        <div className='map'>
            <SelectForm getSelectArea={getSelectArea}/>
            <GoogleMap area={area}/>
        </div>
    );
}

export default Map;
