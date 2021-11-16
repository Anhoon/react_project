import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import {
  Navigate, Route, Routes, BrowserRouter as Router, Switch
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from './components/GlobalStyles'
//import 'src/mixins/chartjs';
import theme from 'src/theme';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import RegisterView from 'src/views/auth/RegisterView';
import BoardList from 'src/views/board/list';
import BoardWrite from 'src/views/board/write';
import Customer from 'src/views/customer/CustomerListView';
import DashBoard from 'src/views/reports/DashboardView';
import Account from 'src/views/account/AccountView';
import Settings from 'src/views/settings/SettingsView';
import NotFound from 'src/views/errors/NotFoundView';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Route>

        

        <Route path="/view" element={<DashboardLayout />}>
          <Route path="board">
            <Route path="list" element={<BoardList/>} />
            <Route path="write" element={<BoardWrite/>} />
          </Route>
          <Route path="customer" element={<Customer />} />
          <Route path="dashBoard" element={<DashBoard />} />
          <Route path="account" element={<Account />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notFound" element={<NotFound />} />
        </Route>
        {/* <Navigate to="/user/home"/> */}
      </Routes>
      <GlobalStyles />
    </ThemeProvider>
  );
};

export default App;
