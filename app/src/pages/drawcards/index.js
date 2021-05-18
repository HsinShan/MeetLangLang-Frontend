import React, { useState } from 'react';
import DrawCardsPage from '../../components/drawcards/drawCardPage';
import Result from '../../components/drawcards/result';

const DrawCards = () => {
    const [drawCard, setDrawCard] = useState(false);
    const petInformation = (pet) => {
        console.log(pet);
        setDrawCard(pet);
    };

    return (
        <>
            { !drawCard && <div className="draw-card"><DrawCardsPage setPet={petInformation}/></div> }
            { drawCard && <Result/>}
        </>
    );
};

export default DrawCards;
