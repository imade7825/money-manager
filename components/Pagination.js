import styled from "styled-components";

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <PaginationWrapper>
      {/* previous button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>

      {/* page info */}
      <PageInfo>
        Page{currentPage} of {totalPages}
      </PageInfo>

      {/* next button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>

      {/* items per page */}
      <Select
        value={pageSize}
        onChange={(event) => onPageSizeChange(Number(event.target.value))}
      >
        {[2, 4, 6].map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </Select>
    </PaginationWrapper>
  );
}

const PaginationWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;
