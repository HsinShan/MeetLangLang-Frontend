import { Select } from 'antd';
import '../../assets/style/search/sortBlock.scss';

const { Option } = Select;

const SortBlock = () => (
    <div className='sort-block'>
        <Select placeholder="--排序方式--">
            <Option value="animal_opendate" key="sort-0">-- 依照資料更新日期排序 --</Option>
            <Option value="cDate" key="sort-1">-- 依照開放認養日期排序 --</Option>
        </Select>
    </div>
);

export default SortBlock;
