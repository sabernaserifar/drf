import './index.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/header";
import Home from './components/Home';
import Register from './components/register';
import PurchaseList from "./components/purchases/PurchaseList";
import PurchaseCreate from "./components/purchases/PurchaseCreate";
import PurchaseDetail from "./components/purchases/PurchaseDetail";
import PurchaseEdit from "./components/purchases/PurchasesEdit";

import * as Run from "./components/CRUD/Run";
import * as InputRun from "./components/CRUD/InputRun";
import * as Inventory from "./components/CRUD/Inventory";
import * as SensorReading from "./components/CRUD/SensorReading";
import * as FileUpload from "./components/CRUD/FileUpload";
import * as Purchase from "./components/CRUD/Purchase";

import NotFound from './components/NotFound';
import Sensor from './components/SensorData';


import Login from "./components/login";
import Logout from "./components/logout";
import Sidebar from "./components/Sidebar";

import PlotMe from "./components/PlotMe";


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
                  <Route exact path="/profile" element={<Header/>}></Route>
                  {/* <Route exact path="/:content_type/delete/:id/" element={<Delete/>}></Route> */}


                  {/* <Route exact path="/" element={<InventoryList/>}></Route> */}

                  <Route exact path="/inventories/create/:parent/:parentID" element={<Inventory.Create/>}></Route>
                  <Route exact path="/inventories/create/" element={<Inventory.Create/>}></Route>
                  <Route exact path="/inventories/" element={<Inventory.List/>}></Route>
                  <Route exact path="/inventories/:id" element={<Inventory.Detail/>}></Route>
                  <Route exact path="/inventories/:id/:parent/:parentID" element={<Inventory.Detail/>}></Route>    

                  <Route exact path="/inventories/edit/:id" element={<Inventory.Edit/>}></Route>
                  <Route exact path="/inventories/edit/:id/:parent/:parentID" element={<Inventory.Edit/>}></Route>

                  <Route exact path="/inventories/delete/:id" element={<Inventory.Delete/>}></Route>
                  <Route exact path="/inventories/delete/:id/:parent/:parentID" element={<Inventory.Delete/>}></Route>



                            
                  <Route exact path="/purchases/create/" element={<Purchase.Create/>}></Route>
                  <Route exact path="/purchases/" element={<Purchase.List/>}></Route>
                  <Route exact path="/purchases/:id" element={<Purchase.Detail/>}></Route>
                  <Route exact path="/purchases/edit/:id" element={<Purchase.Edit/>}></Route>
                  <Route exact path="/purchases/delete/:id/" element={<Purchase.Delete/>}></Route>
                  
                  <Route exact path="/operations/create/" element={<Run.Create/>}></Route>
                  <Route exact path="/operations/" element={<Run.List/>}></Route>
                  <Route exact path="/operations/:id" element={<Run.Detail/>}></Route>
                  <Route exact path="/operations/edit/:id" element={<Run.Edit/>}></Route>
                  <Route exact path="/operations/delete/:id/" element={<Run.Delete/>}></Route>

                  <Route exact path="/input_operations/create/:parent/:parentID" element={<InputRun.Create/>}></Route>
                  <Route exact path="/input_operations/edit/:id/:parent/:parentID" element={<InputRun.Edit/>}></Route>
                  <Route exact path="/input_operations/:id/:parent/:parentID" element={<InputRun.Detail/>}></Route>    
                  <Route exact path="/input_operations/delete/:id/:parent/:parentID" element={<InputRun.Delete/>}></Route>    


                  <Route exact path="/sensor_readings/create/:parent/:parentID" element={<SensorReading.Create/>}></Route>
                  <Route exact path="/sensor_readings/edit/:id/:parent/:parentID" element={<SensorReading.Edit/>}></Route>
                  <Route exact path="/sensor_readings/:id/:parent/:parentID" element={<SensorReading.Detail/>}></Route>    
                  <Route exact path="/sensor_readings/delete/:id/:parent/:parentID" element={<SensorReading.Delete/>}></Route>  

                  <Route exact path="/file_uploads/create/" element={<FileUpload.Create/>}></Route>
                  <Route exact path="/file_uploads/" element={<FileUpload.List/>}></Route>
                  <Route exact path="/file_uploads/:id" element={<FileUpload.Detail/>}></Route>
                  <Route exact path="/file_uploads/edit/:id" element={<FileUpload.Edit/>}></Route>
                  <Route exact path="/file_uploads/delete/:id/" element={<FileUpload.Delete/>}></Route> 
                  <Route exact path="/file_uploads/delete/:id/:parent/:parentID" element={<FileUpload.Delete/>}></Route>  



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
