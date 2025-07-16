import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], itemsPerPage: number ) {
  const [currentPage, setCurrentPage] = useState(1);

  // calcular índices
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  // usar useMemo para no recalcular innecesariamente
  const currentItems = useMemo(
    () => items.slice(indexOfFirst, indexOfLast),
    [items, indexOfFirst, indexOfLast]
  );

  const totalPages = Math.ceil(items.length / itemsPerPage);

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
