import '@picocss/pico'
import './App.scss';
//routing
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './layout/Layout';
import LayoutAdmin from './layout/admin/LayoutAdmin'
import Home from './views/Home'
import HomeAdmin from './views/admin/HomeAdmin'
import NotFound from './views/NotFound';

/* afsluttende */
import Energidata from './views/sidsteopgave/Energidata'
import Nyheder from './views/sidsteopgave/Nyheder'
import ViborghaveserviceForside from './views/sidsteopgave/ViborghaveserviceForside'
import ViborghaveserviceSlider from './views/sidsteopgave/ViborghaveserviceSlider'
import EditService from './views/admin/sidsteopgave/EditService'
import Vejrdata from './views/sidsteopgave/Vejrdata';









function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* PUBLIC */}

        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/Energidata' element={<Energidata />} />
          <Route path='/Nyheder' element={<Nyheder />} />
          <Route path='/ViborghaveserviceForside' element={<ViborghaveserviceForside />} />
          <Route path='/ViborghaveserviceSlider' element={<ViborghaveserviceSlider />} />
          <Route path='/Vejrdata' element={<Vejrdata />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* ADMIN */}

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path='/admin/EditService' element={<EditService />} />
          <Route path='*' element={<NotFound />} />
        </Route>

      </>
    )
  )

  return (
    <main className='container'>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
