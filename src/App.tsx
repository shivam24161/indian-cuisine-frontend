import { Routes, Route } from 'react-router-dom'
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Header from './components/Header'
import ListPage from './pages/ListPage'
import DetailPage from './pages/DetailPage'
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import './styles.css'

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      {/* Global header with search and navigation */}
      <Header />
      
      {/* Main content container */}
      <div className="container">
        <Routes>          
          {/* Public authentication routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected routes - require authentication */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dishes" element={<ListPage />} />
            <Route path="/dishes/:id" element={<DetailPage />} />
          </Route>
        </Routes>
      </div>
    </FluentProvider>
  )
}
