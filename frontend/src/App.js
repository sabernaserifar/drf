import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Home from './components/Home';
import Register from './components/register';
import Purchase from "./components/purchases/Purchase";
import PurchaseCreate from "./components/purchases/PurchaseCreate";
import PurchaseDetail from "./components/purchases/PurchaseDetail";
import PurchaseEdit from "./components/purchases/PurchasesEdit";
import PurchaseDelete from "./components/purchases/PurchaseDelete";
import Run from "./components/runs/Run";
import RunCreate from "./components/runs/RunCreate";
import RunDetail from "./components/runs/RunDetail";
import RunEdit from "./components/runs/RunEdit";
import InventoryDetail from "./components/inventories/Detail";
import InventoryEdit from "./components/inventories/Edit";
import InventoryDelete from "./components/inventories/Delete";
import InventoryCreate from "./components/inventories/Create";
import Mytimepick from "./components/purchases/mydatepicker";

import Login from "./components/login";
import Logout from "./components/logout";
import Sidebar from "./components/Sidebar";


function App() {
  return (
    <BrowserRouter>
        <div className="App">
        <Header/>

         <Sidebar/>

          <div className="content">
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route exact path="/register" element={<Register/>}></Route>
                  <Route exact path="/login" element={<Login/>}></Route>
                  <Route exact path="/logout" element={<Logout/>}></Route>
                  {/*<Route exact path="/profile" element={<Header/>}></Route>*/}

                  {/*<Route exact path="/inventories/" element={<InventoryDetail/>}></Route>*/}
                  <Route exact path="/inventories/:id" element={<InventoryDetail/>}></Route>
                  <Route exact path="/inventories/edit/:id" element={<InventoryEdit/>}></Route>
                  <Route exact path="/inventories/delete/:id" element={<InventoryDelete/>}></Route>
                  <Route exact path="/inventories/create/:source/:id" element={<InventoryCreate/>}></Route>
                  <Route exact path="/purchases/" element={<Purchase/>}></Route>
                  <Route exact path="/purchases/create" element={<PurchaseCreate/>}></Route>
                  <Route exact path="/purchases/:id" element={<PurchaseDetail/>}></Route>
                  <Route exact path="/purchases/edit/:id" element={<PurchaseEdit/>}></Route>
                  <Route exact path="/purchases/delete/:id" element={<PurchaseDelete/>}></Route>

                  <Route exact path="/runs/" element={<Run/>}></Route>
                  <Route exact path="/runs/create" element={<RunCreate/>}></Route>
                  <Route exact path="/runs/:id" element={<RunDetail/>}></Route>
                  <Route exact path="/runs/edit/:id" element={<RunEdit/>}></Route>





                  <Route exact path="/sensors" element={<Mytimepick/>}></Route>



              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
