
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Mounting Error:", error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; text-align: center;">
        <h2>حدث خطأ أثناء تحميل التطبيق</h2>
        <p>${error instanceof Error ? error.message : "خطأ غير معروف"}</p>
        <button onclick="location.reload()" style="padding: 10px 20px; cursor: pointer;">إعادة التحميل</button>
      </div>
    `;
  }
}
