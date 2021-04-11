import { Row, Col } from 'antd';

const PetProfile = (props) => {
    console.log(props);
    return (
        <Row align="center">
            <Col>
                <span>{JSON.stringify(props)}</span>
            </Col>
        </Row>
    );
};

export default PetProfile;
