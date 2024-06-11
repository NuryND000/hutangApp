import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser";
import "./components/App.css";
import EditUser from "./components/EditUser";
import SearchPelanggan from "./components/SearchUser";
import UserList from "./components/UserList";
import DetailUser from "./components/detailUser";
import TidakAda from "./components/tidakada";
import Login from "./components/Login";

function App() {
  return (
    <div className="pb-5">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<AddUser />} />
            <Route path="cari" element={<SearchPelanggan />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="detail/:id" element={<DetailUser />} />
            <Route path="editpel/:id" element={<TidakAda />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    //has
  );
}

export default App;
