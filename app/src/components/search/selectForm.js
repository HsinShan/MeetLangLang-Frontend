import React, { useState } from 'react';
import { Select, Button } from 'antd';
import _ from 'lodash';
import { AREA, ANIMAL_AGE, ANIMAL_SEX } from '../../constants';
import '../../assets/style/search/searchForm.scss';

const { Option } = Select;

const getKindList = (data) => {
    const kindList = _.uniq(_.map(data, 'animal_kind'));
    return kindList;
};

const SelectForm = ({ data, getFilterOptions }) => {
    const sexOptions = { ...ANIMAL_SEX };
    const ageOptions = { ...ANIMAL_AGE };
    const kindList = getKindList(data);
    const areaOptions = { ...AREA };
    const [filterOptions, setFilterOptions] = useState({
        animal_sex: '',
        animal_kind: '',
        animal_age: '',
        animal_area_pkid: '',
    });

    const onKindSelect = (value) => {
        setFilterOptions({ ...filterOptions, animal_kind: value });
    };

    const onSexSelect = (value) => {
        setFilterOptions({ ...filterOptions, animal_sex: value });
    };

    const onAgeSelect = (value) => {
        setFilterOptions({ ...filterOptions, animal_age: value });
    };

    const onAreaSelect = (value) => {
        setFilterOptions({ ...filterOptions, animal_area_pkid: value });
    };

    const onSearchBtnClick = () => {
        getFilterOptions(filterOptions);
    };

    return (
        <div className='search-form'>
            <div className="title">我想找的毛小孩</div>
            <div className="selection">
                <p>類別</p>
                <Select placeholder="種類" onChange={onKindSelect}>
                    <Option value="" key="kind">-- 全部 --</Option>
                    {
                        kindList.map((option, i) => (
                            <Option value={option} key={`kind-${i}`}>{option}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>性別是</p>
                <Select placeholder="性別" onChange={onSexSelect}>
                    <Option value="" key={`sex-${0}`}>-- 全部 --</Option>
                    {
                        _.map(sexOptions, (value, key) => (
                            <Option value={key} key={`sex-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>年齡為</p>
                <Select placeholder="年齡" onChange={onAgeSelect}>
                    <Option value="" key={`age-${0}`}>-- 全部 --</Option>
                    {
                        _.map(ageOptions, (value, key) => (
                            <Option value={key} key={`age-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>所在地</p>
                <Select placeholder="地區" onChange={onAreaSelect}>
                    <Option value="" key={`area-${0}`}>-- 全部 --</Option>
                    {
                        _.map(areaOptions, (value, key) => (
                            <Option value={key} key={`area-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <Button type="primary" onClick={onSearchBtnClick}>搜尋</Button>
        </div>
    );
};

export default SelectForm;
