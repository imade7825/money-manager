import { ToastContainer } from "react-toastify";
import styled from "styled-components";

export const StyledToastContainer = styled(ToastContainer).attrs({
  position: "bottom-right",
  autoClose: 3500,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  role: "status",
  "aria-live": "polite",
})`
  .Toastify__toast {
    border-radius: var(--radius, 14px);
    border: 2px solid var(--pb-500);
    box-shadow: var(--shadow, 0 2px 8px rgba(0, 0, 0, 0.15));
    font-weight: 600;
    padding: 0.5rem 1rem;
    background: var(--surface-elevated);
    color: var(--foreground);
  }

  .Toastify__toast--success {
    border-color: var(--pb-500);
    background: var(--pb-50);
    color: var(--pb-900);
  }

  .Toastify__toast--error {
    border-color: red;
    background: #fee2e2;
    color: #991b1b;
  }

  .Toastify_close-button {
    color: inherit;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }

  .Toastify__progress-bar {
    background: var(--pb-500);
    height: 4px;
    border-radius: 2px;
  }
`;
