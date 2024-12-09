import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import LayoutRoutes from 'routes/LayoutRoutes';
import Products from 'routes/Products';
import Home from 'routes/Home';
import About from 'routes/About';
import Cart from 'routes/Cart';
import Payments from 'routes/Payments';
import Login from 'routes/Login';
import Map from 'routes/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutRoutes/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/home',
        element: <Home/>
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/products',
        element: <Products/>,
      },
      {
        path: '/cart',
        element: <Cart/>
      },
      {
        path: '/payments',
        element: <Payments/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/map',
        element: <Map/>
      },
    ]
  }
  
])

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
