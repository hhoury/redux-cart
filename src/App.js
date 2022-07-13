import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import { useEffect, useState } from 'react';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: 'pending',
          title: 'Sending...',
          message: 'Sending Cart Data',
        })
      );
      const response = await fetch(
        'https://redux-cart-81673-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!!',
          message: 'Send Cart Data ',
        })
      );
    };

    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch((error) => {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!',
          message: 'Send Cart Data Failed!',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <>
      <Layout>
       {notification &&  <Notification status={notification.status} title={notification.title} message={notification.message} />}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
