import { Outlet } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from './ScrollToTop';

// The frame around every page: header on top, footer at the bottom.
// <Outlet /> is the "hole" where React Router puts the current page.
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
