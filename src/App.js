import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages and components
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Create from './pages/create/Create';
import Project from './pages/project/Project';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route 
                index path='/' 
                element={user ? <Dashboard /> : <Navigate to='login' />} 
              />
              <Route 
                path='create' 
                element={user ? <Create /> : <Navigate to='/login' />} 
              />
              <Route 
                path='projects/:id' 
                element={user ? <Project /> : <Navigate to='/login' />} 
              />
              <Route 
                path='login' 
                element={!user ? <Login /> : <Navigate to='/' />} 
              />
              <Route 
                path='signup' 
                element={!user ? <Signup /> : <Navigate to='/' />} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
