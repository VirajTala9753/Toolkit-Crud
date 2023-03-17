import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Table from "./component/table/Table";
import Form from "./component/form/Form";
import Error from "./common/Error";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:id" element={<Form />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
