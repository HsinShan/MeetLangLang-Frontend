import React from 'react';
import Table from '../components/search/index.js'
// import ReactTable from 'react-table';

function Search() {
  return (
    (<div className="search">This is Search Page.</div>),
    (
      <div className="mesarch">
        <form>
          <label>我想找的毛小孩為：</label>
          <select id="dropdown_category">
            {/* value={this.state.selectValue} */}
            {/* onChange={this.handleChange} */}
            <option value="ok"> </option>
            <option value="dog">dog</option>
            <option value="cat">cat</option>
          </select>
          <label> 性別 </label>
          <select id="dropdown_sex">
            <option value="ok"> </option>
            <option value="F">Female</option>
            <option value="M">Male</option>
          </select>
          <label> 年齡 </label>
          <input id="age"></input>
          <p></p>
          <label>品種 </label>
          <select valeu="dropdown_breed">
            <option value="ok"> </option>
            <option vlaue="1">1</option>
            <option value="2">2</option>
          </select>
          <label> 所在位置 </label>
          <select value="dropdown_position">
            <option value="ok"> </option>
            <option value="Taipei">台北市</option>
            <option value="New Taipei City">新北市</option>
          </select>
          <p></p>
          <button>依條件搜尋</button>
        </form>
      </div>
    )
  );
}
const table = () =>{
    <div className="Tableinformation">
        <Table />
    </div>
}
export default {Search,table};
