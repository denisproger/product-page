import { useNavigate } from 'react-router';

type BackButtonProps = {
  fallback: string; // where to go if there is no previous page
  label?: string;
};

// Works like the browser's Back button, so the previous page keeps its filters.
// If the user opened this page directly from a link, there is no previous page,
// so we go to the fallback address instead.
function BackButton({ fallback, label = 'Back' }: BackButtonProps) {
  const navigate = useNavigate();

  function goBack() {
    // React Router stores the step number in history.state.idx (0 = first page in this tab)
    const canGoBack = (window.history.state?.idx ?? 0) > 0;
    if (canGoBack) navigate(-1);
    else navigate(fallback);
  }

  return (
    <button className="back-button" onClick={goBack}>
      <span aria-hidden="true">←</span> {label}
    </button>
  );
}

export default BackButton;
