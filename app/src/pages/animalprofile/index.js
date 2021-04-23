import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Button,
    message,
} from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import _ from 'lodash';
import DefaultImage from '../../assets/images/defaultImage.svg';
import '../../assets/style/animalprofile/index.scss';

const apiProtocol = process.env.REACT_APP_API_PROTOCOL;
const apiPort = process.env.REACT_APP_API_PORT;
const { hostname } = window.location;

const formatSex = (sex) => {
    let result = sex;
    if (sex === 'F') result = '女生';
    if (sex === 'M') result = '男生';
    return result;
};

const formatSterilization = (sterilization) => {
    let result = sterilization;
    if (sterilization === 'T') result = '已結紮';
    if (sterilization === 'F') result = '未結紮';
    if (sterilization === 'N') result = '不確定';
    return result;
};

const token = localStorage.getItem('token');

const AnimalProfile = ({ isLogin }) => {
    const location = useLocation();
    const noData = '無';
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
            console.log('data:', data);
            const searchResult = _.filter(data.animalInfo, ['animal_id', currentAnimal]);
            console.log('searchresult:', searchResult);
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
                    message.success('收藏成功');
                    setIsSaved(true);
                }
            } catch (err) {
                message.error('收藏失敗');
            }
        } else {
            message.error('請先登入才可以使用收藏功能喔');
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
                    message.success('已取消收藏');
                    setIsSaved(false);
                }
            } catch (err) {
                message.error('收藏失敗');
            }
        }
    };

    return (
        <div className="animalprofile">
            <Row className="header" justify="space-between">
                <Col flex="none">
                    <Link to="/">
                        <LeftOutlined /> 上一頁
                    </Link>
                </Col>
                <Col className="main-title" flex="none">{'[ 浪浪資料 ]'}</Col>
                <Col flex="none">
                    {(!isSaved) &&
                        <Button
                            className="saveanimal-button"
                            onClick={() => saveAnimalLogic()}>加入收藏
                        </Button>
                    }
                    {(isSaved) &&
                        <Button
                            className="deleteanimal-button"
                            onClick={() => unsaveAnimalLogic()}>
                            取消收藏
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
                        <Col className="title" span={8}>類別</Col>
                        <Col span={16}>{ (animal.animal_kind) ? animal.animal_kind : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>性別</Col>
                        <Col span={16}>{ (animal.animal_sex) ? formatSex(animal.animal_sex) : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>毛色</Col>
                        <Col span={16}>{ (animal.animal_colour) ? animal.animal_colour : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>結紮與否</Col>
                        <Col span={16}>{ (animal.animal_sterilization) ? formatSterilization(animal.animal_sterilization) : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>所在地</Col>
                        <Col span={16}>{ (animal.animal_place) ? animal.animal_place : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>地址</Col>
                        <Col span={16}>{ (animal.shelter_address) ? animal.shelter_address : noData }</Col>
                    </Row>
                    <Row>
                        <Col className="title" span={8}>聯絡電話</Col>
                        <Col span={16}>{ (animal.shelter_tel) ? animal.shelter_tel : noData }</Col>
                    </Row>
                </Col>
            </Row>
            <Row className="others" justify="center">
                <Col className="main-title" md={17} sm={20} xs={24}>{ '[ 其他備註 ]' }</Col>
                <Col className="board" md={17} sm={20} xs={24}>{ (animal.animal_remark) ? animal.animal_remark : noData }</Col>
            </Row>
        </div>
    );
};

export default AnimalProfile;
