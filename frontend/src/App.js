import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Home from './components/Home';
import Register from './components/register';
import PurchaseList from "./components/purchases/PurchaseList";
import PurchaseCreate from "./components/purchases/PurchaseCreate";
import PurchaseDetail from "./components/purchases/PurchaseDetail";
import PurchaseEdit from "./components/purchases/PurchasesEdit";
import PurchaseDelete from "./components/purchases/PurchaseDelete";
import PurchaseItemDetail from "./components/purchases/items/PurchaseItemDetail";

import Login from "./components/login";
import Logout from "./components/logout";

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
                  <Route path="/purchases/" element={<PurchaseList/>}></Route>
                  <Route path="/purchases/:id" element={<PurchaseDetail/>}></Route>
                  <Route path="/purchases/edit/:id" element={<PurchaseEdit/>}></Route>
                  <Route path="/purchases/delete/:id" element={<PurchaseDelete/>}></Route>
                  <Route path="/purchaseItem/:id" element={<PurchaseItemDetail/>}></Route>


                  /purchasesItem/' + item_id


              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
