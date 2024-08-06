import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import ClassListPage from './pages/ClassListPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthGuard from './utils/AuthGuard';
import PublicRoute from './utils/PublicRoute';
import Navbar from './components/Navbar';
import ClassInfoPage from './pages/ClassInfoPage';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/classes" element={<ClassListPage />} />
          <Route path="/classes/:id" element={<ClassInfoPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
