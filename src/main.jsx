import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import store from './store';
import DollarValuesComponent from './components/DollarValuesComponent';
import DollarChart from './components/DollarChart';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DollarValuesComponent />
      <DollarChart />
    </LocalizationProvider>
  </Provider>
);
// import React from 'react';
// import ReactDOM from 'react-dom/client'; // ¡Este import cambia!
// import { Provider } from 'react-redux';
// import store from './store';
// import DollarValuesComponent from './components/DollarValuesComponent';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//     <DollarValuesComponent/>
//   </Provider>
// );