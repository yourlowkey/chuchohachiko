import React from 'react';
import Table from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function ItemTable(props) {
  const [items, setItems] = useState(null);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    console.log('student table useEffect!!');
    setItems(props.data);
  }, [props.data]);

  const sortColumn = (field, type) => {
    const sortData = [...items]; //tạo mới dữ liệu để state trỏ đến dữ liệu mới
    //const sortData = items;
    if (type == 'string') {
      sortData.sort((a, b) => direction * a[field].localeCompare(b[field]));
    } else if (type == 'number') {
      sortData.sort((a, b) => direction * (a[field] - b[field]));
    }
    setDirection(direction * -1);
    setItems(sortData);
  };

  const deleteUser = (id) => {
    fetch('https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats/' + id, {
      method: 'DELETE',
    }).then(() => {
      console.log('delete successful!!');
      let result = [...items];
      result = result.filter((item) => {
        return item.id != id;
      });
      setItems(result);
    });
  };

  console.log('item table main');
  var item_list = [];
  if (items != null) {
    item_list = items.map((item) => (
      // <tr className={item.style}>
      <tr
        key={item.id}
        className={
          (item.mPoint + item.hPoint + item.stamina) / 3 >= 70
            ? 'table-success'
            : (item.mPoint + item.hPoint + item.stamina) / 3 > 40
            ? 'table-primary'
            : 'table-danger'
        }
      >
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.mPoint}</td>
        <td>{item.hPoint}</td>
        <td>{item.stamina}</td>
        {/* <td>{item.mark}</td> */}
        <td>
          <Link to={'/item/' + item.id}>Details</Link>
          <Link to={'/itemedit/' + item.id}>
            <button type="button" class="btn btn-primary">
              Edit
            </button>
          </Link>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => deleteUser(item.id)}
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th onClick={() => sortColumn('id', 'number')}>
              <b>ID</b>
            </th>
            <th onClick={() => sortColumn('name', 'string')}>Cat Name</th>

            <th onClick={() => sortColumn('hPoint', 'number')}>
              Health Point <span> </span>
              {/*  <a href="?sort=desc">
            <i class="fa fa-arrow-down"></i>
          </a> */}
            </th>
            <th onClick={() => sortColumn('mPoint', 'number')}>Mana Point</th>
            <th onClick={() => sortColumn('stamina', 'number')}>Stamina</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">{item_list}</tbody>
      </table>
    </>
  );
}

export default ItemTable;
