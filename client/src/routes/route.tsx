import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Charts from '../pages/Charts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/userchart/:id' element={<Charts />} />
      <Route path='*' element={<div>Not Found</div>} />
    </Route>
  )
);

export default router;
