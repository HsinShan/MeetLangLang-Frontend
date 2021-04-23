import { Select, Button, Tooltip } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../../assets/style/map/selectForm.scss';

const { Option } = Select;

const SelectForm = () => {
    function onSearch(val) {
        console.log('search:', val);
    }

    return (
        <div className="search-form">
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="我要找縣市收容所"
                optionFilterProp="region"
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="新北市">新北市</Option>
                <Option value="台北市">台北市</Option>
                <Option value="桃園市">桃園市</Option>
            </Select>

            <Tooltip title="search">
                <Button shape="circle" icon={<SearchOutlined />} />
            </Tooltip>
        </div>
    );
};

export default SelectForm;
