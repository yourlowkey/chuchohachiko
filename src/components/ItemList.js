import ProgressBar from 'react-bootstrap/ProgressBar';
import React from 'react';
import { Link } from 'react-router-dom';
function ItemList(props) {
  var item_jsx = [];
  if (props.data != null) {
    item_jsx = props.data.map((item) => (
      <div className="card col-sm-4" key={item.id}>
        <img
          className="card-img-top mt-3 w-15 "
          src={item.image}
          alt="Card image "
        />
        <div className="card-body">
          <h4 className="card-title">{item.name}</h4>
          <div>
            Health
            <ProgressBar variant="danger" animated now={item.hPoint} />
          </div>

          <div>
            Mana
            <ProgressBar animated now={item.mPoint} />
          </div>
          <div>
            Stamina
            <ProgressBar variant="success" animated now={item.stamina} />
          </div>
          <Link to={'/item/' + item.id}>
            <button className="btn btn-primary">Detail</button>
          </Link>
        </div>
      </div>
    ));
  }
  return item_jsx;
}
export default ItemList;
