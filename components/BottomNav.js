import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <Bar role="navigation" aria-label="Main navigation">
      <NavItem href="/" $active={pathname === "/"}>
        Home
      </NavItem>
      <NavItem href="/create" $active={pathname === "/create"}>
        Create
      </NavItem>
      <NavItem href="/piechart" $active={pathname === "/piechart"}>
        Pie Chart
      </NavItem>
    </Bar>
  );
}

const Bar = styled.nav`
  position: fixed;
  inset: auto 0 0 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var(--surface-elevated);
  border-top: 1px solid var(--border);
  box-shadow: var(--shadow);
  height: 68px;
  padding: 6px, 8px;
  z-index: 1;
`;

const NavItem = styled(Link)`
  display: grid;
  place-items: center;
  gap: 4px;
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ $active }) => ($active ? "var(--primary)" : "var(--foreground)")};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  border-top: 3px solid
    ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  transition: color 0.15s ease, border-color 0.15s ease;
`;
