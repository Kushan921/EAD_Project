import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/login';
import Sidebar from './Components/Dashboard';
import AllCustomers from './Components/AllCustomers';
import AllBookings from './Components/AllBookings';
import AllSchedule from './Components/AllSchedule';
import Sidebar2 from './Components/Dashboard2';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/login" exact element={<Login/>}/>
          <Route path= "/sidebar" exact element = {<Sidebar/>}/>
          <Route path="/customers" exact element={<AllCustomers/>}/>
          <Route path="/bookings" exact element={<AllBookings/>}/>
          <Route path="/schedules" exact element={<AllSchedule/>}/>
          <Route path="/sidebar2" exact element={<Sidebar2/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
