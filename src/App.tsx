import { useState, useReducer } from 'react';
import { Routes, Route } from 'react-router-dom';
import cartReducer from './state/cartReducer';
import { getAddressValues } from './utils/addresses';
import SiteHeader from './components/SiteHeader';
import HomePage from './pages/HomePage/index';
import CartPage from './pages/CartPage';
import ApparelShowPage from './pages/ApparelShowPage';
import MusicShowPage from './pages/MusicShowPage';
import AccessoryShowPage from './pages/AccessoryShowPage';
import ArtistPage from './pages/ArtistPage';
import CollectionPage from './pages/CollectionPage';
import CheckoutPage from './pages/CheckoutPage';
import FAQPage from './pages/FAQPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PaymentPage from './pages/PaymentPage';
import ContactPage from './pages/ContactPage';
import BillingAddressForm from './pages/CheckoutPage/BillingAddressForm';
import ShippingForm from './pages/CheckoutPage/ShippingForm';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import PaymentFormWrapper from './pages/CheckoutPage/PaymentFormWrapper';
import SiteFooter from './components/SiteFooter';
import { 
  SHIPPING_METHODS, 
  DEFAULT_ADDRESS_FORM, 
  EMPTY_TEXT_INPUT, 
  APPAREL_PAGES,
  MUSIC_PAGES,
  ACCESSORY_PAGES
} from './constants';
import { 
  Apparel, 
  ApparelProduct, 
  Album, 
  MusicProduct, 
  Accessory, 
  AccessoryProduct, 
  ShippingMethod,
  MailingAddressForm,
  MailingAddressInput,
  CheckoutPhase,
  Order,
  PendingOrder
} from './types';
import './App.css';
import { httpFormat } from './utils/formatting';

const App = () => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const [viewingCartPage, setViewingCartPage] = useState(false);
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>(SHIPPING_METHODS[0]);
  const [email, setEmail] = useState<MailingAddressInput<string>>(EMPTY_TEXT_INPUT);
  const [phone, setPhone] = useState<MailingAddressInput<string>>(EMPTY_TEXT_INPUT);
  const [billingAddress, setBillingAddress] = useState<MailingAddressForm>(DEFAULT_ADDRESS_FORM);
  const [shippingAddress, setShippingAddress] = useState<MailingAddressForm>(DEFAULT_ADDRESS_FORM);
  const [checkoutPhase, setCheckoutPhase] = useState<CheckoutPhase>('info');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const order: PendingOrder = {
    contact: {
      email: email.value,
      phone: phone.value
    },
    billingAddress: getAddressValues(billingAddress),
    shippingAddress: getAddressValues(shippingAddress),
    shippingMethod: shippingMethod,
    cart: state
  }

  const resetCustomerData = () => {
    setEmail(EMPTY_TEXT_INPUT);
    setPhone(EMPTY_TEXT_INPUT);
    setBillingAddress(DEFAULT_ADDRESS_FORM);
    setShippingAddress(DEFAULT_ADDRESS_FORM);
    setShippingMethod(SHIPPING_METHODS[0]);
    dispatch({ type: 'EMPTY_CART' });
  }

  const musicProductPages = MUSIC_PAGES.map(page => httpFormat(page));
  const apparelProductPages = APPAREL_PAGES.map(page => httpFormat(page));
  const accessoryProductPages = ACCESSORY_PAGES.map(page => httpFormat(page));

  return (
    <div className="app">
        {!checkingOut && <SiteHeader 
          cart={state} 
          dispatch={dispatch} 
          viewingCartPage={viewingCartPage}
          cartIsVisible={cartIsVisible}
          setCartIsVisible={setCartIsVisible}
        />}
      <div className="app-content">       
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/checkout' element={
            <CheckoutPage 
              cart={state} 
              setCheckingOut={setCheckingOut} 
              shippingCost={shippingMethod.cost}
              checkoutPhase={checkoutPhase}
            />
          }>
            <Route path='info' element={
              <BillingAddressForm 
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                setCheckoutPhase={setCheckoutPhase}
              />
            } />
            <Route path='shipping' element={
              <ShippingForm 
                shippingMethod={shippingMethod} 
                setShippingMethod={setShippingMethod} 
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                billingAddress={billingAddress}
                setCheckoutPhase={setCheckoutPhase}
              />
            } />
            <Route path='payment' element={
              <PaymentFormWrapper 
                setCheckoutPhase={setCheckoutPhase} 
                setConfirmedOrder={setConfirmedOrder}
                order={order}
                resetCustomerData={resetCustomerData}
              />
            } />
          </Route>
          <Route 
            path='/order-success' 
            element={
              <OrderConfirmationPage order={confirmedOrder} setConfirmedOrder={setConfirmedOrder} />} 
          />
          <Route 
            path='/order-error' 
            element={
              <p className="plain-text">
                There was an issue with your order. Please contact info@infinitebliss.com for assistance.
              </p>
            } 
          />
          <Route path='/cart' element={
            <CartPage cart={state} dispatch={dispatch} setViewingCartPage={setViewingCartPage}/>
          } />
          <Route 
            path='/music/:collectionName' 
            element={<CollectionPage<Album, MusicProduct> category='Music' collections={musicProductPages} />} 
          />
          <Route path='/music/:collectionName/products/:itemId' element={
            <MusicShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible} />
          } />
          <Route 
            path='/apparel/:collectionName' 
            element={
              <CollectionPage<Apparel, ApparelProduct> category='Apparel' collections={apparelProductPages} />
            } 
          />
          <Route path='/apparel/:collectionName/products/:itemId' element={
            <ApparelShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible} />
          } />
          <Route path='/accessories/:collectionName' element={
            <CollectionPage<Accessory, AccessoryProduct> 
              category='Accessories' 
              collections={accessoryProductPages}
            />
          } />
          <Route path='/accessories/:collectionName/products/:itemId' element={
            <AccessoryShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible}/>
          } />
          <Route path='/artists/:collectionName' element={
            <ArtistPage />} 
          />
          <Route path='/artists/:collectionName/apparel/:itemId' element={
            <ApparelShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible} />
          } />
          <Route path='/artists/:collectionName/music/:itemId' element={
            <MusicShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible} />
          } />
          <Route path='/artists/:collectionName/accessories/:itemId' element={
            <AccessoryShowPage dispatch={dispatch} setCartIsVisible={setCartIsVisible} />
          } />
          <Route path='/faqs' element={<FAQPage />} />
          <Route path='/terms-and-conditions' element={<TermsAndConditionsPage />} />
          <Route path='/privacy-policy' element={<PrivacyPolicyPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route 
            path='*' 
            element={
              <p className="plain-text">404 Error: A page with this address could not be found {':('}</p>
            } 
          />        
        </Routes>
      </div>
      {!checkingOut && <SiteFooter />}
    </div>
  );
}

export default App;
