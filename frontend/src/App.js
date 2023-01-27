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
import InventoryDetail from "./components/inventories/Detail";
import InventoryEdit from "./components/inventories/Edit";
import InventoryDelete from "./components/inventories/Delete";

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
                  {/*<Route exact path="/inventories/" element={<InventoryDetail/>}></Route>*/}
                  <Route exact path="/inventories/:id" element={<InventoryDetail/>}></Route>
                  <Route path="/inventories/edit/:id" element={<InventoryEdit/>}></Route>
                  <Route path="/inventories/delete/:id" element={<InventoryDelete/>}></Route>
                  <Route path="/purchases/" element={<PurchaseList/>}></Route>
                  <Route path="/purchases/:id" element={<PurchaseDetail/>}></Route>
                  <Route path="/purchases/edit/:id" element={<PurchaseEdit/>}></Route>
                  <Route path="/purchases/delete/:id" element={<PurchaseDelete/>}></Route>


                  /purchasesItem/' + item_id


              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
