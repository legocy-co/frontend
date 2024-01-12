import './app/index.pcss';
import './assets/styles/reset.scss';
import './assets/styles/global.scss';
import './assets/styles/style.scss';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <DndProvider backend={HTML5Backend}>
      <AppRouter />
    </DndProvider>
  </BrowserRouter>
);
