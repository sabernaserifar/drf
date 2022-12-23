import './index.css';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home'
import PurchaseCreate from "./components/PurchaseCreate";
import PurchaseDetail from "./components/PurchaseDetail";

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Navbar/>
          <div className="content">
              <Routes>
                  <Route exact path="/" element={<Home/>}></Route>
                  <Route path="/purchases/" element={<PurchaseCreate/>}></Route>
                  <Route path="/purchases/:id" element={<PurchaseDetail/>}></Route>
              </Routes>
          </div>
        </div>
    </BrowserRouter>
  );
}

export default App;
