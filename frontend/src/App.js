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
import * as Inventory from "./components/inventories/InventoryCRUD";

// import NotFound from './components/NotFound';
import Sensor from './components/SensorData';


import Login from "./components/login";
import Logout from "./components/logout";
import Sidebar from "./components/Sidebar";

// import PlotMe from "./components/PlotMe";


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
                  {/* <Route exact path="/:content_type/delete/:id/" element={<Delete/>}></Route> */}


                  {/* <Route exact path="/" element={<InventoryList/>}></Route> */}

                  <Route exact path="/inventories/create/:parent/:parentID" element={<Inventory.Create/>}></Route>
                  <Route exact path="/inventories/create/" element={<Inventory.Create/>}></Route>
                  <Route exact path="/inventories/" element={<Inventory.List/>}></Route>
                  <Route exact path="/inventories/:id" element={<Inventory.Detail/>}></Route>
                  <Route exact path="/inventories/edit/:id" element={<Inventory.Edit/>}></Route>
                  <Route exact path="/inventories/delete/:id" element={<Inventory.Delete/>}></Route>

                  <Route exact path="/inventories/create/:parent/:parentID" element={<Inventory.Create/>}></Route>
                  <Route exact path="/inventories/edit/:id/:parent/:parentID" element={<Inventory.Edit/>}></Route>
                  <Route exact path="/inventories/:id/:parent/:parentID" element={<Inventory.Detail/>}></Route>    
                  <Route exact path="/inventories/delete/:id/:parent/:parentID" element={<Inventory.Delete/>}></Route>

                  
                  <Route exact path="/purchases/" element={<PurchaseList/>}></Route>
                  <Route exact path="/purchases/create" element={<PurchaseCreate/>}></Route>
                  <Route exact path="/purchases/:id" element={<PurchaseDetail/>}></Route>
                  <Route exact path="/purchases/edit/:id" element={<PurchaseEdit/>}></Route>
                  
                  <Route exact path="/runs/create/" element={<Run.Create/>}></Route>
                  <Route exact path="/runs/" element={<Run.List/>}></Route>
                  <Route exact path="/runs/:id" element={<Run.Detail/>}></Route>
                  <Route exact path="/runs/edit/:id" element={<Run.Edit/>}></Route>
                  <Route exact path="/runs/delete/:id/" element={<Run.Delete/>}></Route>

                  <Route exact path="/input_runs/create/:parent/:parentID" element={<InputRun.Create/>}></Route>
                  <Route exact path="/input_runs/edit/:id/:parent/:parentID" element={<InputRun.Edit/>}></Route>
                  <Route exact path="/input_runs/:id/:parent/:parentID" element={<InputRun.Detail/>}></Route>    
                  <Route exact path="/input_runs/delete/:id/:parent/:parentID" element={<InputRun.Delete/>}></Route>    

                  {/* <Route exact path="/plot" element={<PlotMe/>}></Route> */}
                  <Route exact path="/sensors" element={<Sensor/>}></Route>


                  {/* <Route path='*' element={<NotFound/>}></Route> */}
                  


              </Routes>
          </div>
            {/*<Footer />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
