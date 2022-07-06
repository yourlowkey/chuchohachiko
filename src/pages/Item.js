import React from 'react';

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
const Item = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  useEffect(() => {
    console.log('user use effect!!');

    let url =
      'https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats/' + params.id;

    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItem(data); //setStudents(data)
      });
  }, []);

  return (
    <>
      {item != null ? (
        <div class="container bootstrap snippets bootdey">
          <div class="panel-body inf-content">
            <div class="row">
              <div class="col-md-6">
                <strong>Information</strong>
                <br />
                <div class="table-responsive">
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Identificacion</strong>
                        </td>
                        <td class="text-primary">{item.id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cat Name</strong>
                        </td>
                        <td class="text-primary">{item.name}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Health Point</strong>
                        </td>
                        <td class="text-primary">{item.hPoint}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Mana Point</strong>
                        </td>
                        <td class="text-primary">{item.mPoint}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Stamina</strong>
                        </td>
                        <td class="text-primary">{item.stamina}</td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Picture</strong>
                        </td>
                        <td class="text-primary">
                          <img src={item.image} className="img-circle" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'loading'
      )}
    </>
  );
};

export default Item;
