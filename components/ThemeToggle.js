import styled from "styled-components";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label = theme === "dark" ? "" : "";
  const icon = theme === "dark" ? "☀️" : "🌙";
  return (
    <Toggle onClick={toggle} aria-label={`Switch to ${label} mode`}>
      {icon} {label}
    </Toggle>
  );
}

const Toggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 5px;
`;
