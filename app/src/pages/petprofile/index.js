import { useLocation, Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import DefaultImage from '../../assets/images/defaultImage.svg';

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

const PetProfile = () => {
    const location = useLocation();
    const noData = '無';
    const { animal } = location.state;
    return (
        <>
            <Row justify="space-arround">
                <Col flex="auto">
                    <Link to="/">
                        <LeftOutlined /> 上一頁
                    </Link>
                </Col>
                <Col flex="auto">{ '[ 浪浪資料 ]' }</Col>
                <Col flex="auto">{ '加到收藏' }</Col>
            </Row>
            <Row>
                <Col span={8}>
                    <img width={'100%'} src={animal.album_file || DefaultImage} />
                </Col>
                <Col span={16}>
                    <Row>
                        <Col span={8}>類別</Col>
                        <Col span={16}>{ (animal.animal_kind) ? animal.animal_kind : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>性別</Col>
                        <Col span={16}>{ (animal.animal_sex) ? formatSex(animal.animal_sex) : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>毛色</Col>
                        <Col span={16}>{ (animal.animal_colour) ? animal.animal_colour : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>結紮與否</Col>
                        <Col span={16}>{ (animal.animal_sterilization) ? formatSterilization(animal.animal_sterilization) : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>所在地</Col>
                        <Col span={16}>{ (animal.animal_place) ? animal.animal_place : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>地址</Col>
                        <Col span={16}>{ (animal.shelter_address) ? animal.shelter_address : noData }</Col>
                    </Row>
                    <Row>
                        <Col span={8}>聯絡電話</Col>
                        <Col span={16}>{ (animal.shelter_tel) ? animal.shelter_tel : noData }</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={24}>{ '[ 其他備註 ]' }</Col>
                <Col span={24}>{ (animal.animal_remark) ? animal.animal_remark : noData }</Col>
            </Row>
        </>
    );
};

export default PetProfile;
