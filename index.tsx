
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("LingoFlow: Starting initialization...");

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("LingoFlow: Render triggered.");
  } catch (error) {
    console.error("LingoFlow: Critical Render Error:", error);
    container.innerHTML = `<div style="padding:20px; color:red; text-align:center;">Mounting Error: ${error}</div>`;
  }
} else {
  console.error("LingoFlow: Root container not found!");
}
