import './index.css';
import App from './App.jsx';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
// import React from 'react'; // Weird how this is grayed out but needed and used

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>,
);