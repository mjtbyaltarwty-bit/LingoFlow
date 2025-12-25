
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  try {
    const container = document.getElementById('root');
    if (!container) return;

    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("LingoFlow: App mounted successfully.");
  } catch (error) {
    console.error("LingoFlow: Mounting failed", error);
    // إظهار الخطأ مباشرة إذا فشل الـ render
    const container = document.getElementById('root');
    if (container) {
      container.innerHTML = `<div style="padding:20px; color:red;">Mounting Error: ${error}</div>`;
    }
  }
};

// التأكد من أن المستند جاهز تماماً قبل البدء
if (document.readyState === 'complete') {
  mountApp();
} else {
  window.addEventListener('load', mountApp);
}
