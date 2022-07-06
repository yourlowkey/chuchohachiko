import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const UserEdit = () => {
  const params = useParams();
  const [item, setItem] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    console.log('user use effect!!');
    if (params.id != 'new') {
      let item_url =
        'https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats/' + params.id;

      console.log(item_url);
      fetch(item_url)
        .then((response) => response.json())
        .then((data) => {
          //change date
          var date = new Date(data.dob);
          data.dob = date.toISOString().slice(0, 10);
          console.log(data.dob);
          setItem(data);
        });
    } else {
      let initData = {};
      //initData.firstName="";
      //initData.lastName="";

      initData.home = {};
      //initData.home.address="";
      //initData.home.city="";
      //initData.home.country="";
      setItem(initData);
    }
  }, []);

  var str2bool = (value) => {
    if (value && typeof value === 'string') {
      if (value.toLowerCase() === 'true') return true;
      if (value.toLowerCase() === 'false') return false;
    }
    return value;
  };

  const handleChange = (event) => {
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;

    console.log(name);
    let data = { ...item };
    data[name] = value;

    if (name == 'gender') {
      data[name] = str2bool(value);
      console.log('gender');
      console.log(data[name]);
    }

    console.log(data);
    setItem(data);
  };

  // const handleChangeHome = (event) => {
  //   //console.log(event);
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   console.log(name);
  //   console.log(value);
  //   let data = { ...item };
  //   data.home[name] = value;

  //   console.log(data);
  //   setItem(data);
  // };

  const saveUser = () => {
    let myMethod = 'POST';
    let id = '';
    if (item.id) {
      myMethod = 'PUT';
      id = item.id;
    }
    const requestOptions = {
      method: myMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    };
    fetch(
      'https://62b049b8b0a980a2ef4f73a7.mockapi.io/Coolcats/' + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        var date = new Date(data.dob);
        data.dob = date.getTime();

        console.log(data);
        navigate(-1);
      });
  };

  return (
    <>
      {item != null ? (
        <div class="container bootstrap snippets bootdey">
          <div class="panel-body inf-content">
            <div class="row">
              <div class="col-md-6">
                <strong>{item.id ? 'Edit' : 'Add'} Your Information</strong>
                <br />
                <div class="table-responsive">
                  <table class="table table-user-information">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Your Identificacion</strong>

                          <button href="/itemedit/new">Add new</button>
                        </td>
                        <td class="text-primary">{item.id}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Cat Name</strong>
                        </td>
                        {/* <td class="text-primary">{item.firstName}</td> */}
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Health Point</strong>
                        </td>
                        <td>
                          <input
                            type="number"
                            className="form-control"
                            value={item.lastName}
                            name="hPoint"
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Mana Point</strong>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.email}
                            name="mPoint"
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Stamina</strong>
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            value={item.email}
                            name="stammina"
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Appears on </strong>
                        </td>
                        <td>
                          <input
                            type="date"
                            id="birthday"
                            name="dob"
                            value={item.dob}
                            onChange={(e) => handleChange(e)}
                          ></input>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Gender</strong>
                        </td>
                        <td>
                          <div>
                            <input
                              type="radio"
                              value="false"
                              checked={item.gender == false}
                              name="gender"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            Male
                            <input
                              type="radio"
                              value="true"
                              checked={item.gender == true}
                              name="gender"
                              onChange={(e) => {
                                handleChange(e);
                              }}
                            />
                            Female
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Picture</strong>
                        </td>
                        <td class="text-primary">
                          <img src={item.image} className="img-circle" />
                        </td>
                      </tr>

                      <tr>
                        <td>
                          <strong>Bio</strong>
                        </td>
                        <td>
                          <textarea
                            type="text"
                            name="bio"
                            className="form-control"
                            value={item.bio}
                            onChange={(e) => handleChange(e)}
                          ></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => saveUser()}
                    >
                      Save
                    </button>
                    <span> </span>
                    <Link to="/">
                      <button type="button" class="btn btn-secondary">
                        Cancel
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div class="d-flex align-items-center">
          <strong>Loading...</strong>
          <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        </div>
      )}
    </>
  );
};

export default UserEdit;
