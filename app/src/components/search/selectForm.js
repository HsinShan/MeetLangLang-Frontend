import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import '../../assets/style/search/selectForm.scss';

const { Option } = Select;

const SelectForm = ({ getFilterOptions }) => {
    const { t } = useTranslation();
    const sexOptions = { ...t('animal_sex', { returnObjects: true }) };
    const ageOptions = { ...t('animal_age', { returnObjects: true }) };
    const kindOptions = { ...t('animal_kind', { returnObjects: true }) };
    const areaOptions = { ...t('area', { returnObjects: true }) };
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
        setFilterOptions({
            ...filterOptions,
            animal_area_pkid: parseInt(value, 10),
        });
    };

    const onSearchBtnClick = () => {
        getFilterOptions(filterOptions);
    };

    return (
        <div className='search-form'>
            <div className="title">{t('search.default')}</div>
            <div className="selection">
                <p>{t('search.kind-text')}</p>
                <Select placeholder={t('search.kind')} onChange={onKindSelect}>
                    <Option value="" key="kind">{t('search.all')}</Option>
                    {
                        _.map(kindOptions, (value, key) => (
                            <Option value={key} key={`kind-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>{t('search.sex-text')}</p>
                <Select placeholder={t('search.sex')} onChange={onSexSelect}>
                    <Option value="" key={`sex-${0}`}>{t('search.all')}</Option>
                    {
                        _.map(sexOptions, (value, key) => (
                            <Option value={key} key={`sex-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>{t('search.age-text')}</p>
                <Select placeholder={t('search.age')} onChange={onAgeSelect}>
                    <Option value="" key={`age-${0}`}>{t('search.all')}</Option>
                    {
                        _.map(ageOptions, (value, key) => (
                            <Option value={key} key={`age-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="selection">
                <p>{t('search.area-text')}</p>
                <Select placeholder={t('search.area')} onChange={onAreaSelect}>
                    <Option value="" key={`area-${0}`}>{t('search.all')}</Option>
                    {
                        _.map(areaOptions, (value, key) => (
                            <Option value={key} key={`area-${key}`}>{value}</Option>
                        ))
                    }
                </Select>
            </div>
            <Button type="primary" className="search-btn" onClick={onSearchBtnClick}>{t('search.search')}</Button>
        </div>
    );
};

export default SelectForm;
