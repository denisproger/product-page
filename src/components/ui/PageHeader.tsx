import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  subtitle?: ReactNode;
  children?: ReactNode; // anything extra: a back button, breadcrumbs…
};

// The same title block at the top of every simple page.
function PageHeader({ title, subtitle, children }: PageHeaderProps) {
  return (
    <div className="page-header">
      {children}
      <h1 className="page-header__title">{title}</h1>
      {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
