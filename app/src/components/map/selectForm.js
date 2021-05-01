import { Select, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import '../../assets/style/map/selectForm.scss';
import { useState } from 'react';

const { Option } = Select;

const SelectForm = ({ getSelectArea }) => {
    const { t } = useTranslation();
    const [selectarea, setSelectArea] = useState(null);

    function onSelect(val) {
        setSelectArea(val);
    }

    const areas = Object.values(t('area', { returnObjects: true }));
    return (
        <div className="search-form">
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder={t('map.default')}
                optionFilterProp="region"
                onChange={onSelect}
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
                <Button shape="circle" onClick={() => getSelectArea(selectarea) } icon={<SearchOutlined />} />
            </Tooltip>
        </div>
    );
};

export default SelectForm;
