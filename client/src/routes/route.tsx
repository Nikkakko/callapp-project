import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import RootLayout from '../layout/RootLayout';
import Home from '../pages/Home';
import Charts from '../pages/Charts';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/userschart' element={<Charts />} />
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);

export default router;
