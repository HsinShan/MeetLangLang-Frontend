import React from 'react';
import { Select, Button, Input } from 'antd';

const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
}

function searchForm() {
    return (
        <div>
            <h4>我想找的毛小孩類別：
                <Select
                    showSearch
                    style={{ marginLeft: 10, width: 200, marginRight: 10 }}
                    placeholder="毛小孩類別"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value="Dog">Dog</Option>
                    <Option value="Cat">Cat</Option>
                </Select>
                  性別是
                <Select
                    showSearch
                    style={{ marginLeft: 10, width: 200, marginRight: 10 }}
                    placeholder="性別"
                    optionFilterProp="sex"
                    onChange={onChange}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value="Male">Male</Option>
                    <Option value="Famele">Famele</Option>
                </Select>
                    年齡為
                <Input placeholder="age" style={{ marginLeft: 10, width: 200 }}/>
                <p></p>
            品種為
                <Select
                    showSearch
                    style={{ marginLeft: 10, width: 200, marginRight: 10 }}
                    placeholder="品種"
                    optionFilterProp="category"
                    onChange={onChange}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value="one">one</Option>
                    <Option value="two">Two</Option>
                </Select>
            所在地
                <Select
                    showSearch
                    style={{ marginLeft: 10, width: 200, marginRight: 10 }}
                    placeholder="縣市"
                    optionFilterProp="City"
                    onChange={onChange}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    <Option value="Taipei">Taipei</Option>
                    <Option value="New Taipei">New Taipei</Option>
                </Select>
                <Button type="primary" style={{ backgroundColor: '#131834' }}>search</Button>
            </h4>
        </div>
    );
}

export default searchForm;
