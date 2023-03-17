import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../../Redux/formSlice.js";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formAddData = useSelector((state) => state?.Data);
  console.log(formAddData);

  const deleteData = (item) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(
          removeData({
            id: item.id,
          })
        );
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };
  return (
    <div>
      <Link to="/form">
        <button className="btn btn-success mt-3">Create</button>
      </Link>

      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>

              <th>City</th>
              <th>State</th>
              <th>dob</th>
              <th>Age</th>
              <th>Address</th>
              <th className="col-1">Profile Image</th>
              <th>Favourite Color</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {formAddData.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>

                  <td>{item.mail}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>

                  <td>{item.dob}</td>
                  <td>{item.age}</td>
                  <td>{item.address}</td>
                  <td>
                    <img className="col-5" src={item.file} />
                  </td>
                  <td>
                    <div
                      className="form-control form-control-color col-1"
                      style={{ background: `${item.color}` }}
                    />
                  </td>
                  <td>{item.status.toString()}</td>
                  <td>
                    <button
                      onClick={() => {
                        navigate(`/form/${item.id}`);
                      }}
                      className="btn btn-outline-secondary mx-2 "
                    >
                      edit Data
                    </button>
                    <button
                      onClick={() => deleteData(item)}
                      className="btn btn-outline-danger mx-2"
                    >
                      remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
