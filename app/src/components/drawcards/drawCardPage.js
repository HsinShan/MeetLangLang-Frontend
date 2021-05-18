import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { SmileOutlined, MehOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import '../../assets/style/drawcards/drawCardPage.scss';
import cat from '../../assets/images/drawCardsCat.png';
import dog from '../../assets/images/drawCardsDog.png';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;

const DrawCardsPage = () => {
    const { t } = useTranslation();
    const [havePets, setHavePets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [drawcard, setDrawCard] = useState(false);
    // const [pets, setPets] = useState(null);
    const getPets = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setHavePets(data);
                setIsLoading(false);
            });
    };

    const startDrawCard = async () => {
        setDrawCard(true);
        // const pet = { petName: 'test', petSex: 'Male', petAge: '10' };
        // setPets(pet);
        /*
        const { hostname } = window.location;
        const token = localStorage.getItem('token');
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/draw`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setPets(data);
                setIsLoading(false);
            });
        */
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPets(token);
        setDrawCard(false);
    }, [isLoading]);

    const HeadImage = () => (
        <div className="img">
            <img className="cat" src={cat}></img>
            <img className="dog" src={dog}></img>
        </div>
    );

    const NoPet = () => (
        <>
            <h4 className="no-pet">{t('drawcards.no-pet')}
                <Link to = 'pet/add'>
                    <Button shape="round" value="small" className="go-add-pet">{t('drawcards.add-pet')}</Button>
                </Link>
            </h4>
            <div className="draw-card-button">
                <Button disabled shape="round" size="large" className="cannot-draw-card" icon={<MehOutlined />}>{t('drawcards.start')}</Button>
            </div>
        </>
    );
    const HavePet = () => (
        <>
            <h4 className="have-pet">{t('drawcards.have-pet')}
                <p>{t('drawcards.description')}</p>
            </h4>
            <div className="draw-card-button">
                <Button shape="round" size="large" className="start-draw-card" icon={<SmileOutlined /> } onClick={startDrawCard}>{t('drawcards.start')}</Button>
            </div>
        </>
    );
    // const ShowResult = () => {
    //     console.log(drawcard);
    //     console.log(pets);
    //     return (
    //         <div className="draw-card-result">
    //             { pets.petName }
    //         </div>
    //     );
    // };
    return (
        <>
            { !drawcard && <div className="description"><HeadImage/><div className="title"><h3>{t('drawcards.title')}</h3></div> { !isLoading && havePets.length !== 0 && <HavePet/> } { !isLoading && havePets.length === 0 && <NoPet/> } </div>}
        </>
    );
};

export default DrawCardsPage;