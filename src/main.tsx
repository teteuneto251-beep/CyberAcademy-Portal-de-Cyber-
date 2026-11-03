import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Auto-register PWA service worker with immediate caching
registerSW({
  immediate: true,
  onNeedRefresh() {
    // New version available
  },
  onOfflineReady() {
    // Offline ready
  },
});

createRoot(document.getElementById('root')!).render(<App />);
