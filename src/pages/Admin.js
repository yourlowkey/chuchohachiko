import React from 'react';
import ItemTable from '../components/ItemTable.js';
import { useState, useEffect } from 'react';

function Admin() {
  const [items, setItems] = useState(null);
  useEffect(() => {
    console.log('app useeffect!!');
    let url = 'https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats';

    // if (searchTerm.length > 0) {
    //   url = url + '?search=' + searchTerm;
    // }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  return <ItemTable data={items} />;
}
export default Admin;
