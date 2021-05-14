import { List } from 'antd';
import { useTranslation } from 'react-i18next';

const PetList = ({ pets }) => {
    const { t } = useTranslation();

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
                        <p className="pet-block-label">{ t('card.sex') }</p>
                        <span className="pet-block-info">{ t('animal_sex', { returnObjects: true })[pet.petSex] }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">{ t('card.age') }</p>
                        <span className="pet-block-info">{ pet.petAge }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">{ t('card.kind') }</p>
                        <span className="pet-block-info">{ t('animal_kind', { returnObjects: true })[pet.petKind] }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">{ t('card.intro') }</p>
                        <span className="pet-block-info">{ pet.petIntro }</span>
                    </div>
                </List.Item>
            )}
        />
    );
};
export default PetList;
