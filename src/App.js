import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import { useEffect } from 'react';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isInitial){
      isInitial = false;
      return;
    }
    if(cart.changed){
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])
  



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
