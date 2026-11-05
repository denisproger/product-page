import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import { CartProvider } from './context/CartProvider';
import AboutPage from './pages/AboutPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import ProductPage from './pages/ProductPage';
import ShopPage from './pages/ShopPage';

function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Every page is shown inside Layout (header + footer). */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
