import { uiActions } from './ui-slice';
import { cartActions } from './cart-slice';
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending Cart Data',
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        'https://redux-cart-81673-default-rtdb.firebaseio.com/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error('Sending cart data failed.');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!!',
          message: 'Send Cart Data ',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!!',
          message: 'Send Cart Data Failed!',
        })
      );
    }
  };
};

export  const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://redux-cart-81673-default-rtdb.firebaseio.com/cart.json'
      );
      if(!response.ok){
        throw new Error('Could not fetch cart data!');
      }
      const data = await response.json();
      return data;
    };
    try {
       const cartData = await fetchData();
       dispatch(cartActions.replaceCart({
        items: cartData.items || [],
        totalQuantity: cartData.totalQuantity
       }));

    } catch (error) {
        dispatch(
            uiActions.showNotification({
              status: 'error',
              title: 'Error!!',
              message: 'Fetching Cart Data Failed!',
            })
          );
    }
  };
};
