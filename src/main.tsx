import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import './scss/styles.scss'
import AppRouters from './appRouters/AppRouters.tsx'


createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AppRouters />
	</BrowserRouter>,
)
