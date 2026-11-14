import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import bridge from '@vkontakte/vk-bridge';

if (window.location.search.includes('vk_app_id=')) {
  bridge.send('VKWebAppInit');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
