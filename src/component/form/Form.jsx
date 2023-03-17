import React, { useEffect, useState } from "react";
import csc from "country-state-city";
import swal from "sweetalert";
import Select from "react-select";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addForm } from "../../Redux/formSlice.js";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";

const initial = {
  name: "",
  password: "",
  mail: "",
  dob: "",
  color: "#050505",
  address: "",
  age: "0",
};

export default function Form() {
  const dispatch = useDispatch();
  const getFormData = useSelector((state) => state.Data);

  console.log("getFormData", getFormData);

  const [input, setInput] = useState(initial);
  const [errors, setErrors] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(false);
  const [city, setCity] = useState({});
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const formUpdateData = useSelector((state) => state?.Data);

  useEffect(() => {
    if (id) {
      const findDataById = formUpdateData.find((item) => 

        item.id === id 
      );
  
    }
  }, [id]);

  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));

  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  const uploadfile = (e) => {
    let file = e.target.files[0];

    const size = (file.size / (1024 * 1024)).toFixed(2);

    if (size > 2) {
      toast.info("file size support up to 2mb!", { autoClose: 2000 });
    } else {
      const fileName = URL.createObjectURL(file);
      setFile(fileName);
    }
  };

  const changeevent = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
    if (event.target.name.trim()) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const submitForm = () => {
    dispatch(
      addForm({
        id: uuid(),
        ...input,
        state: state.name,
        city: city.name,
        file: file,
        status: status,
      })
    );
    navigate("/");
  };

  return (
    <div>
      <div className="col-12 d-flex justify-content-center">
        <div className="m-3 col-5 ">
          <h1 className="text-center"> Create-Form</h1>
          <div className=" border p-3 ">
            <lable for="name">name</lable>
            <input
              className="m-1 form-control"
              id="name"
              type="text"
              name="name"
              placeholder="enter your name"
              onChange={(e) => changeevent(e)}
              value={input.name}
            />
            <span className="text-danger"> {errors["name"]}</span>

            <label for="password">Password</label>

            <input
              className=" m-1 form-control"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => changeevent(e)}
              value={input.password}
            />

            <span className="text-danger"> {errors["password"]}</span>

            <lable for="email">email </lable>
            <input
              className=" m-1 form-control"
              type="email"
              name="mail"
              placeholder="name123@gmail.com"
              onChange={(e) => changeevent(e)}
              value={input.mail}
            />

            <span className="text-danger"> {errors["mail"]}</span>
            <lable for="state">State </lable>
            <Select
              id="state"
              name="state"
              options={updatedStates("101")}
              value={state}
              onChange={(value) => {
                setState(value);
              }}
            />

            <lable for="state">State </lable>
            <Select
              id="city"
              name="city"
              options={updatedCities(state ? state.value : null)}
              value={city}
              onChange={(value) => setCity(value)}
            />

            <lable for="date">date</lable>

            <input
              className=" m-1 form-control"
              type="date"
              name="dob"
              placeholder="date of birth"
              onChange={(e) => changeevent(e)}
              value={input.dob}
            />
            <span className="text-danger"> {errors["dob"]}</span>

            <label for="customRange1" className="form-label">
              Age({input.age})
            </label>
            <input
              type="range"
              className="form-range"
              name="age"
              id="customRange1"
              max={150}
              defaultValue="0"
              onChange={(e) => changeevent(e)}
              value={input.age}
            ></input>

            <p> </p>

            <label for="exampleFormControlTextarea1"> Address</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              name="address"
              onChange={(e) => changeevent(e)}
              maxlength="500"
              value={input.address}
            ></textarea>

            <div class="mb-3">
              <label for="formFileSm" className="form-label">
                Small file input example
              </label>
              <input
                className="form-control form-control-sm"
                id="formFileSm"
                type="file"
                accept="image/*"
                onChange={(e) => uploadfile(e)}
              />
              {file && <img src={file} className="col-3 m-2" alt="" />}
            </div>

            <label for="exampleColorInput" class="form-label">
              Favourite Color
            </label>
            <input
              type="color"
              className="form-control form-control-color"
              id="exampleColorInput"
              title="Choose your color"
              name="color"
              onChange={(e) => changeevent(e)}
              value={input.color}
            ></input>

            <div className="form-check form-switch ml-5">
              <label className="form-check-label" for="flexSwitchCheckChecked">
                Status
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                checked={status}
                id="flexSwitchCheckChecked"
                onChange={(e) => setStatus(e.target.checked)}
              />
            </div>

            <div>
              <button
                className="btn btn-success mt-3"
                onClick={submitForm}
                //    onClick={click}
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
