import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/login';
import Sidebar from './Components/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/login" exact element={<Login/>}/>
          <Route path= "/sidebar" exact element = {<Sidebar/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
