import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';

const PetProfile = (props) => {
    const location = useLocation();
    console.log(location.state);
    return (
        <Row align="center">
            <Col>
                <span>{JSON.stringify(props)}</span>
            </Col>
        </Row>
    );
};

export default PetProfile;
