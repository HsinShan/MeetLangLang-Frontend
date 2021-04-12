import React from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash';

const { Option } = Select;

const getSelectionList = (data) => {
    const sexList = _.uniq(_.map(data, 'animal_sex'));
    const kindList = _.uniq(_.map(data, 'animal_kind'));
    const areaList = _.uniq(_.map(data, 'animal_area_pkid'));
    const ageList = _.uniq(_.map(data, 'animal_age'));
    return {
        sexList,
        kindList,
        areaList,
        ageList,
    };
};

const SelectForm = ({ data }) => {
    const {
        sexList,
        kindList,
        areaList,
        ageList,
    } = getSelectionList(data);

    return (
        <div>
            <p>我想找的毛小孩</p>
            <div>
                類別
                <Select placeholder="種類">
                    {
                        kindList.map((option, i) => (
                            <Option value={option} key={option + i}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                性別是
                <Select placeholder="性別">
                    {
                        sexList.map((option, i) => (
                            <Option value={option} key={option + i}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                年齡為
                <Select placeholder="年齡">
                    {
                        ageList.map((option, i) => (
                            <Option value={option} key={option + i}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                所在地
                <Select placeholder="地區">
                    {
                        areaList.map((option, i) => (
                            <Option value={option} key={option + i}>{option}</Option>
                        ))
                    }
                </Select>

            </div>
            <Button type="primary" style={{ backgroundColor: '#131834' }}>search</Button>
        </div>
    );
};

export default SelectForm;
