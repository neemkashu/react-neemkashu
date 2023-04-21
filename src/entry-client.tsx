import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

const root = document.querySelector('#app') as HTMLElement;

ReactDOM.hydrateRoot(
  root,
  <BrowserRouter>
    <p>Hello world</p>
  </BrowserRouter>
);
console.log('hydrated');
