import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import NavBar from "./components/NavBar";
import SearchPelanggan from "./components/SearchUser";
import DetailUser from "./components/detailUser";

function App() {
  return (
    <div className="pb-5">
      <NavBar />
      <BrowserRouter>
        <div className="container" >
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<AddUser />} />
            <Route path="cari" element={<SearchPelanggan />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="detail/:id" element={<DetailUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
