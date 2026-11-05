import { useEffect } from 'react';
import { useLocation } from 'react-router';

// When the page (pathname) changes, jump to the top, like a normal website does.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // this component draws nothing
}

export default ScrollToTop;
