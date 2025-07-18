import { useState, useMemo, useEffect } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number ) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  useEffect(() => {
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }
  if (totalPages === 0 && currentPage !== 1) {
    setCurrentPage(1);
  }
}, [totalPages, currentPage]);

  // calcular índices
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  // usar useMemo para no recalcular innecesariamente
  const currentItems = useMemo(
    () => items.slice(indexOfFirst, indexOfLast),
    [items, indexOfFirst, indexOfLast]
  );

  // opcional: funciones para cambiar de página
  const goToPage = (page: number) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return {
    currentPage,
    totalPages,
    currentItems,
    setCurrentPage: goToPage,
    nextPage,
    prevPage,
  };
}
