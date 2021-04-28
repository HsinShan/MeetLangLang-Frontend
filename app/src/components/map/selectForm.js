import { Select, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import '../../assets/style/map/selectForm.scss';

const { Option } = Select;

const SelectForm = () => {
    function onSearch(val) {
        console.log('search:', val);
    }
    const { t } = useTranslation();
    const areas = Object.values(t('area', { returnObjects: true }));
    return (
        <div className="search-form">
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder={t('map.default')}
                optionFilterProp="region"
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="">{t('map.default')}</Option>
                {
                    areas.map((area) => (
                        <Option value={ area } key={ area }>{ area }</Option>
                    ))
                }
            </Select>

            <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
        </div>
    );
};

export default SelectForm;
