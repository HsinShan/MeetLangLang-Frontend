import React from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash';
import { AREA, ANIMAL_AGE, ANIMAL_SEX } from '../../constants';

const { Option } = Select;

const getKindList = (data) => {
    const kindList = _.uniq(_.map(data, 'animal_kind'));
    return kindList;
};

const getAreaList = (data) => {
    const area = _.uniq(_.map(data, 'animal_area_pkid'));
    const areaList = [];
    _.forEach(_.sortBy(area), (a) => areaList.push(AREA[a]));
    return areaList;
};

const SelectForm = ({ data }) => {
    const sexList = Object.values(ANIMAL_SEX);
    const ageList = Object.values(ANIMAL_AGE);
    const kindList = getKindList(data);
    const areaList = getAreaList(data);

    return (
        <div>
            <p>我想找的毛小孩</p>
            <div>
                類別
                <Select placeholder="種類">
                    {
                        kindList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                性別是
                <Select placeholder="性別">
                    {
                        sexList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                年齡為
                <Select placeholder="年齡">
                    {
                        ageList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div>
                所在地
                <Select placeholder="地區">
                    {
                        areaList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>

            </div>
            <Button type="primary" style={{ backgroundColor: '#131834' }}>search</Button>
        </div>
    );
};

export default SelectForm;
