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
    // const history = useHistory();
    const [pets, setPets] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const getPets = async (token) => {
        const { hostname } = window.location;
        await axios.get(`${apiProtocol}://${hostname}:${apiPort}/pet/info`, {
            headers: { token },
        })
            .then((res) => {
                const { data } = res;
                setPets(data);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getPets(token);
    }, [isLoading]);
    const NoPet = () => {
        console.log(pets);
        return (
            <h4 className="no-pet">{t('drawcards.no-pet')}
                <Link to = 'pet/add'>
                    <Button shape="round" value="small" className="go-add-pet">{t('drawcards.add-pet')}</Button>
                </Link>
            </h4>
        );
    };
    const HavePet = () => {
        console.log(pets);
        return (
            <h4 className="have-pet">{t('drawcards.have-pet')}
                <p>{t('drawcards.description')}</p>
            </h4>
        );
    };
    return (
        <>
            <div className="description">
                <div className="img">
                    <img className="cat" src={cat}></img>
                    <img className="dog" src={dog}></img>
                </div>
                <div className="title">
                    <h3>{t('drawcards.title')}</h3>
                </div>
                { !isLoading && pets.length !== 0 && <HavePet/> }
                { !isLoading && pets.length === 0 && <NoPet/> }
            </div>
            <div className="draw-card-button">
                { pets ? <Button shape="round" size="large" className="start-draw-card" icon={<SmileOutlined /> }>{t('drawcards.start')}</Button> : <Button disabled shape="round" size="large" className="cannot-draw-card" icon={<MehOutlined />}>{t('drawcards.start')}</Button>}
            </div>
        </>
    );
};

export default DrawCardsPage;
