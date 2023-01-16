import './index.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from './components/Navbar'
// import Header from "./components/header";
// import Footer from "./components/footer";
import Home from './components/Home';
import Register from './components/register';
import PurchaseCreate from "./components/purchases/PurchaseCreate";
import PurchaseDetail from "./components/purchases/PurchaseDetail";
import Header from "./components/header";
import Login from "./components/login";
import Logout from "./components/logout";
import Edit from "./components/purchases/admin/edit";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Header/>
          <div className="content">
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/register" element={<Register/>}></Route>
                  <Route exact path="/login" element={<Login/>}></Route>
                  <Route exact path="/logout" element={<Logout/>}></Route>
                  <Route exact path="/admin/edit/:id" element={<Edit/>}></Route>
                  <Route path="/purchases/" element={<PurchaseCreate/>}></Route>
                  <Route path="/purchases/:id" element={<PurchaseDetail/>}></Route>
              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
