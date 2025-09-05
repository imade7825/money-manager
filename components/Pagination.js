import styled from "styled-components";

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) {
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
        Page {currentPage} of {totalPages}
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
        onChange={(event) => {
          const size = Number(event.target.value);
          onPageSizeChange(size);
          if (currentPage !== 1) {
            onPageChange(1);
          }
        }}
      >
        {[10, 15, 20].map((size) => (
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
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid var(--border);
  background: var(--surface-elevated);
  border-radius: var(--radius-sm);
  cursor: pointer;
  &:hover {
    filter: brightness(1.02);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 0.45rem 0.6rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-elevated);
  color: var(--foreground);
`;
