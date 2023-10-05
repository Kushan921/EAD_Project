import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/login';
import Sidebar from './Components/Dashboard';
import AllCustomers from './Components/AllCustomers';
import AllBookings from './Components/AllBookings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/login" exact element={<Login/>}/>
          <Route path= "/sidebar" exact element = {<Sidebar/>}/>
          <Route path="/customers" exact element={<AllCustomers/>}/>
          <Route path="/bookings" exact element={<AllBookings/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
