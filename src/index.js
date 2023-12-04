import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import 'animate.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import App from './App';

//* Public Screens
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

//* Private Screens
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';

//* Admin Screens
import OrderListScreen from './screens/admin/OrderListScreen';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import reportWebVitals from './reportWebVitals';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
    >
      <Route
        index={true}
        path='/'
        element={<HomeScreen />}
      />
      <Route
        path='/product/:id'
        element={<ProductScreen />}
      />
      <Route
        path='/cart'
        element={<CartScreen />}
      />
      <Route
        path='/login'
        element={<LoginScreen />}
      />
      <Route
        path='/register'
        element={<RegisterScreen />}
      />
      {/* Rutas privadas */}
      <Route
        path=''
        element={<PrivateRoute />}
      >
        <Route
          path='/profile'
          element={<ProfileScreen />}
        />
        <Route
          path='/shipping'
          element={<ShippingScreen />}
        />
        <Route
          path='/payment'
          element={<PaymentScreen />}
        />
        <Route
          path='/placeorder'
          element={<PlaceOrderScreen />}
        />
        <Route
          path='/order/:id'
          element={<OrderScreen />}
        />
      </Route>

      {/* Rutas privadas para administradores */}
      <Route
        path=''
        element={<AdminRoute />}
      >
        <Route
          path='/admin/orderlist'
          element={<OrderListScreen />}
        />
        <Route
          path='/admin/productlist'
          element={<ProductListScreen />}
        />
        <Route
          path='/admin/product/:id/edit'
          element={<ProductEditScreen />}
        />
        <Route
          path='/admin/userlist'
          element={<UserListScreen />}
        />
        {/* <Route
          path='/admin/product/:id/edit'
          element={<ProductEditScreen />}
        /> */}
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
