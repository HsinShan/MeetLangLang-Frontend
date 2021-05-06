import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    message,
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useTranslation, getI18n } from 'react-i18next';
import axios from 'axios';
import _ from 'lodash';

import DefaultImage from '../../assets/images/defaultImage.svg';
import '../../assets/style/animalprofile/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const formatSex = (sex) => {
    const i18n = getI18n();
    let result = sex;
    if (sex === 'F') result = i18n.t('animalprofile.sex.f');
    if (sex === 'M') result = i18n.t('animalprofile.sex.m');
    return result;
};

const formatSterilization = (sterilization) => {
    const i18n = getI18n();
    let result = sterilization;
    if (sterilization === 'T') result = i18n.t('animalprofile.sterilization.t');
    if (sterilization === 'F') result = i18n.t('animalprofile.sterilization.f');
    if (sterilization === 'N') result = i18n.t('animalprofile.sterilization.n');
    return result;
};

const token = localStorage.getItem('token');

const AnimalProfile = ({ isLogin }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const noData = t('animalprofile.none');
    const [isSaved, setIsSaved] = useState(false);
    if (!('state' in location) || !location.state) window.location.href = '/';
    if (!('animal' in location.state) || !location.state.animal) window.location.href = '/';
    const { animal } = location.state;
    const currentAnimal = animal.animal_id;

    const checkAnimalSavedLogic = async () => {
        try {
            const { data } = await axios({
                url: `${apiProtocol}://${hostname}:${apiPort}/animal/favorites`,
                headers: { token },
                method: 'get',
            });
            // Check if animalId is already saved by user
            const searchResult = _.filter(data.animalInfo, ['animal_id', currentAnimal]);
            if (searchResult.length !== 0) {
                setIsSaved(true);
            } else {
                setIsSaved(false);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (isLogin) {
            checkAnimalSavedLogic();
        }
    });

    const saveAnimalLogic = async () => {
        if (isLogin) {
            try {
                const { data } = await axios({
                    url: `${apiProtocol}://${hostname}:${apiPort}/animal/favorites`,
                    method: 'post',
                    headers: { token },
                    data: {
                        animalId: currentAnimal,
                        sex: animal.animal_sex,
                        kind: animal.animal_kind,
                        colour: animal.animal_colour,
                        sterilization: animal.animal_sterilization,
                        remark: animal.animal_remark,
                        tel: animal.shelter_tel,
                        address: animal.shelter_address,
                        place: animal.animal_place,
                        picture: animal.album_file,
                    },
                });
                const { success } = data;
                if (success) {
                    message.success(t('animalprofile.save.success'));
                    setIsSaved(true);
                }
            } catch (err) {
                message.error(t('animalprofile.save.error'));
            }
        } else {
            message.error(t('animalprofile.not-log-in'));
        }
    };

    const unsaveAnimalLogic = async () => {
        if (isLogin) {
            try {
                const { data } = await axios({
                    url: `${apiProtocol}://${hostname}:${apiPort}/animal/favorites`,
                    method: 'delete',
                    headers: { token },
                    data: {
                        animalId: currentAnimal,
                    },
                });
                const { success } = data;
                if (success) {
                    message.success(t('animalprofile.unsave.success'));
                    setIsSaved(false);
                }
            } catch (err) {
                message.error(t('animalprofile.unsave.error'));
            }
        }
    };

    return (
        <div className="animalprofile">
            <Row className="header" justify="space-between">
                <Col flex="none">
                    <Link to="/">
                        <LeftOutlined /> {t('animalprofile.info.prev')}
                    </Link>
                </Col>
                <Col className="main-title" flex="none">{t('animalprofile.info.data')}</Col>
                <Col flex="none">
                    {(!isSaved) &&
                        <Button
                            className="saveanimal-button"
                            onClick={() => saveAnimalLogic()}>{t('animalprofile.info.add')}
                        </Button>
                    }
                    {(isSaved) &&
                        <Button
                            className="deleteanimal-button"
                            onClick={() => unsaveAnimalLogic()}>{t('animalprofile.info.delete')}
                        </Button>
                    }
                </Col>
            </Row>
            <Row justify="center">
                <Col md={7} sm={20} xs={24}>
                    <img width={'100%'} src={animal.album_file || DefaultImage} />
                </Col>
                <Col className="info" md={10} sm={20} xs={24}>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.kind')}</Col>
                        <Col span={16}>{ (animal.animal_kind) ? t('animal_kind', { returnObjects: true })[animal.animal_kind] : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.sex')}</Col>
                        <Col span={16}>{ (animal.animal_sex) ? formatSex(animal.animal_sex) : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.colour')}</Col>
                        <Col span={16}>{ (animal.animal_colour) ? animal.animal_colour : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.sterilization')}</Col>
                        <Col span={16}>{ (animal.animal_sterilization) ? formatSterilization(animal.animal_sterilization) : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.place')}</Col>
                        <Col span={16}>{ (animal.animal_place) ? animal.animal_place : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.address')}</Col>
                        <Col span={16}>{ (animal.shelter_address) ? animal.shelter_address : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>{t('animalprofile.info.tel')}</Col>
                        <Col span={16}>{ (animal.shelter_tel) ? animal.shelter_tel : noData }</Col>
                    </Row>
                </Col>
            </Row>
            <Row className="others" justify="center">
                <Col className="main-title" md={17} sm={20} xs={24}>{t('animalprofile.info.other')}</Col>
                <Col className="board" md={17} sm={20} xs={24}>{ (animal.animal_remark) ? animal.animal_remark : noData }</Col>
            </Row>
        </div>
    );
};

export default AnimalProfile;
