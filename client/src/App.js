import ReactDOM from "react-dom/client";
import { store } from './app/store';
import { Provider } from 'react-redux';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';





const theme = createTheme({
    palette: {
      type: "dark",
    }
  });



