import './App.css'
import { ProductProvider } from './context/productContext'
import { useAuth, AuthProvider } from './context/authContext'

import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';
import LogIn from './pages/logIn/logIn';
import AdminPage from './pages/Admin/adminPage';
import ProductDetails from './components/productDetails/productDetails';
import RegularUserPage from './pages/user/regularUserPage';
import { ThemeProvider } from './context/themeContext';

function AppRoutes() {
  const { user } = useAuth();

  return (
    <>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <LogIn />} />
        <Route path="/" element={ user ? (user.isAdmin ? (<AdminPage />) : (<Navigate to="/regularuser" replace />)) : (<Navigate to="/login" replace />)}/>
        <Route path="/product/:id" element={user ? <ProductDetails /> : <Navigate to="/login" replace />} />
        <Route path="/regularuser" element={user ? <RegularUserPage /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ProductProvider>
    </ThemeProvider>
  );
}

export default App
