import React from 'react';
import { Link } from 'react-router-dom';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useState } from 'react';
import { useEffect } from 'react';
import ItemList from '../components/ItemList';
function App() {
  const [items, setItems] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    console.log('app useeffect!!');
    let url = 'https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats';

    if (searchTerm.length > 0) {
      url = url + '?search=' + searchTerm;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, [searchTerm]);

  return (
    <div>
      <div className="jumbotron text-center">
        <h1>Welcome to Cat Showcase</h1>
        <div className="input-group">
          <input
            placeholder="Search your cat here"
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <div className="input-group-append"></div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <ItemList data={items} />
        </div>
      </div>
    </div>
  );
}
export default App;
