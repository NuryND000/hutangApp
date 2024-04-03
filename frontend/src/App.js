import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import NavBar from "./components/NavBar";
import SearchUser from "./components/SearchUser";

function App() {
  return (
    <div className="pb-5"  style={{ backgroundColor: '#E0E0E2'}}>
      <NavBar />
      <BrowserRouter>
        <div className="container" >
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="add" element={<AddUser />} />
            <Route path="edit/:id" element={<EditUser />} />
            <Route path="cari" element={<SearchUser />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
