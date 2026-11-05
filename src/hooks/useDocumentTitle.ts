import { useEffect } from 'react';

// Changes the text in the browser tab: "Shop | Stride Co."
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Stride Co.`;
  }, [title]);
}
