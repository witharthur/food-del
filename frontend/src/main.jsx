import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './components/Navbar/context/StoreContext.jsx'



try {
  console.log('About to render App');
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  )
  console.log('Render completed');
} catch (error) {
  console.error('Error rendering App:', error);
}