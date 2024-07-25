import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import '@styles/main.css'
import '@fontsource-variable/urbanist/wght.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
