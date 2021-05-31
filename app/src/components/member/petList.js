import { List } from 'antd';
import { useTranslation } from 'react-i18next';
import DefaultImage from '../../assets/images/defaultImage.svg';

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
                    extra={ <img alt="pet" src={`https://images.weserv.nl/?url=${pet.petPhoto}`} onError={(e) => { e.target.onError = null; e.target.src = DefaultImage; }}/> }
                >
                    <List.Item.Meta
                        title={pet.petName}
                    />
                    <div className="pet-block">
                        <p className="pet-block-label">{ t('card.sex') }</p>
                        <span className="pet-block-info">{ t('animal_sex', { returnObjects: true })[pet.petSex] }</span>
                    </div>
                    <div className="pet-block">
                        <p className="pet-block-label">{ t('card.age')}</p>
                        <span className="pet-block-info">{ pet.petAge } {t('card.age-unit') }</span>
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
