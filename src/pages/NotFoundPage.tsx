import { Link } from 'react-router';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type NotFoundPageProps = {
  message?: string;
};

function NotFoundPage({ message = "The page you're looking for doesn't exist or was moved." }: NotFoundPageProps) {
  useDocumentTitle('Page not found');

  return (
    <div className="container page empty">
      <p className="empty__code">404</p>
      <h1>Page not found</h1>
      <p className="muted">{message}</p>
      <div className="cta__buttons">
        <Link to="/" className="button button--primary">
          Home page
        </Link>
        <Link to="/shop" className="button button--ghost">
          Go to the shop
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
