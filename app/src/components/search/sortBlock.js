import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import '../../assets/style/search/sortBlock.scss';

const { Option } = Select;

const SortBlock = ({ getSortOptions }) => {
    const { t } = useTranslation();
    const onChange = (value) => {
        getSortOptions(value);
    };

    return (
        <div className='sort-block'>
            <Select placeholder={t('search.sort')} onChange={onChange}>
                <Option value="cDate" key="sort-0">{t('search.update-date')}</Option>
                <Option value="animal_opendate" key="sort-1">{t('search.open-date')}</Option>
            </Select>
        </div>
    );
};

export default SortBlock;
