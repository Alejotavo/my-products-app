import { Pagination } from "react-bootstrap";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function PaginationComponent({ totalItems, itemsPerPage, currentPage, onPageChange}: Props) {
   
  const  totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const items = [];


  for (let number = 1; number <= totalPages; number++) {

    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => onPageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
      
  }

  return (
        
    <Pagination className="mt-3 justify-content-end" size="sm">
        <Pagination.Prev disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}/>
            {items}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} />
    </Pagination>

  );
}

export default PaginationComponent;
