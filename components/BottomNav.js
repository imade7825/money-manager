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
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: var(--surface-elevated);
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const NavItem = styled(Link)`
  display: grid;
  place-items: center;
  gap: 2px;
  text-decoration: none;
  font-size: 1.2rem;
  color: ${({ $active }) =>
    $active ? "var(--primary)" : "var(--foreground))"};
`;

