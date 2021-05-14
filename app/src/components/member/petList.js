import { List } from 'antd';

const PetList = ({ pets }) => {
    if (!pets) return null;

    return (
        <List
            itemLayout="vertical"
            dataSource={pets}
            renderItem={(pet) => (
                <List.Item
                    key={pet.key}
                    extra={ <img alt="pet" src={pet.petPhoto} /> }
                >
                    <List.Item.Meta
                        title={pet.petName}
                    />
                    <div className="pet-block">
                        <p className="pet-block-label">性別</p>
                        <span className="pet-block-info">{ pet.petSex }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">年齡</p>
                        <span className="pet-block-info">{ pet.petAge }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">種類</p>
                        <span className="pet-block-info">{ pet.petKind }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">簡介</p>
                        <span className="pet-block-info">{ pet.petIntro }</span>
                    </div>
                </List.Item>
            )}
        />
    );
};
export default PetList;
