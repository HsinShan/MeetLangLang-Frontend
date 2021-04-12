import React from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash';
import { AREA, ANIMAL_AGE, ANIMAL_SEX } from '../../constants';
import '../../assets/style/search/searchForm.scss';

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
        <div className='search-form'>
            <div className="title">我想找的毛小孩</div>
            <div className="selection">
                <p>類別</p>
                <Select placeholder="種類">
                    {
                        kindList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>性別是</p>
                <Select placeholder="性別">
                    {
                        sexList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>年齡為</p>
                <Select placeholder="年齡">
                    {
                        ageList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>所在地</p>
                <Select placeholder="地區">
                    {
                        areaList.map((option, i) => (
                            <Option value={option} key={`key-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <Button type="primary">搜尋</Button>
        </div>
    );
};

export default SelectForm;
