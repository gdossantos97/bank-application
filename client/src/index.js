import { createRoot } from "react-dom/client";
import { store } from './app/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Deposit from "./pages/deposit";
import Navigation from "./Components/Navbar";
import { useState, createContext } from 'react';
import Balance from "./pages/balance";
import AllData from "./pages/alldata";
import Withdraw from "./pages/withdraw";
import Dashboard from "./pages/dashboard/Dashboard";
import { Box } from "@mui/material";




export const UserContext = createContext()

function App () {
  
  const [balance, setBalance] = useState(0)
  const value = {balance, setBalance}

  

  return (
    <div>
    <BrowserRouter>
    <Box > 
    <Navigation /> 
    <UserContext.Provider value={value} balance={balance} setBalance={setBalance}>
      <div>
      <Routes>
        <Route exact path="/" element={<Register /> } />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Deposit" element={<Deposit />} />
        <Route path="/Withdraw" element={<Withdraw />} />
        <Route path="/Balance" element={<Balance />} />
        <Route path="/AllData" element={<AllData />} />
        <Route path="/Dashboard" element={<Dashboard />} />

      </Routes>
      </div>
      </UserContext.Provider>
    </Box>
    </BrowserRouter>
    </div>
  );
}


const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  

        <Provider store={store}>
           <App />
        </Provider>

);