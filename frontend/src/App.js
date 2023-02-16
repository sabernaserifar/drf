import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Home from './components/Home';
import Register from './components/register';
import PurchaseList from "./components/purchases/PurchaseList";
import PurchaseCreate from "./components/purchases/PurchaseCreate";
import PurchaseDetail from "./components/purchases/PurchaseDetail";
import PurchaseEdit from "./components/purchases/PurchasesEdit";

import * as Run from "./components/runs/RunCRUD";
import * as InputRun from "./components/runs/InputRunCRUD";


import InventoryList from "./components/inventories/InventoryList";
import InventoryDetail from "./components/inventories/Detail";
import InventoryEdit from "./components/inventories/Edit";
import InventoryCreate from "./components/inventories/Create";

import InputRunEdit from "./components/runs/inputRuns/Edit";
import InputRunDelete from "./components/runs/inputRuns/Delete";
import InputRunCreate from "./components/runs/inputRuns/Create";

import Delete from './components/Delete';


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
                  <Route exact path="/register" element={<Register/>}></Route>
                  <Route exact path="/login" element={<Login/>}></Route>
                  <Route exact path="/logout" element={<Logout/>}></Route>
                  {/*<Route exact path="/profile" element={<Header/>}></Route>*/}
                  <Route exact path="/:content_type/delete/:id/" element={<Delete/>}></Route>


                  <Route exact path="/" element={<InventoryList/>}></Route>

                  {/*<Route exact path="/inventories/" element={<InventoryDetail/>}></Route>*/}
                  <Route exact path="/inventories/" element={<InventoryList/>}></Route>
                  <Route exact path="/inventories/:id" element={<InventoryDetail/>}></Route>
                  <Route exact path="/inventories/edit/:id" element={<InventoryEdit/>}></Route>
                  <Route exact path="/inventories/create/:source/:id" element={<InventoryCreate/>}></Route>
                  
                  <Route exact path="/purchases/" element={<PurchaseList/>}></Route>
                  <Route exact path="/purchases/create" element={<PurchaseCreate/>}></Route>
                  <Route exact path="/purchases/:id" element={<PurchaseDetail/>}></Route>
                  <Route exact path="/purchases/edit/:id" element={<PurchaseEdit/>}></Route>

                  <Route exact path="/runs/" element={<Run.List/>}></Route>
                  <Route exact path="/runs/create/" element={<Run.Create/>}></Route>
                  <Route exact path="/runs/:id" element={<Run.Detail/>}></Route>
                  <Route exact path="/runs/edit/:id" element={<Run.Edit/>}></Route>

                  <Route exact path="/input_runs/edit/:id/runs/:runId" element={<InputRun.Edit/>}></Route>
                  <Route exact path="/input_runs/:id" element={<InputRun.List/>}></Route>
                  
                  <Route exact path="/input_runs/create/runs/:parentID" element={<InputRun.Create/>}></Route>
                  


              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
