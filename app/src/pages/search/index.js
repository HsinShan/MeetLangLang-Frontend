import React from 'react';
import Informationcard from '../../components/search/index';
import Searchform from '../../components/search/form';
import '../../assets/style/page/search/index.scss';

function output() {
  return (
    <div>
      <Searchform />
      <Informationcard />
      <br></br>
      <Informationcard />
      <br></br>
      <Informationcard />
    </div>
  );
}
export default output;
