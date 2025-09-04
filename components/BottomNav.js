import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <Bar role="navigation" aria-label="Main navigation">
      <NavLink href="/" $active={pathname === "/"}>
        Home
      </NavLink>
      <NavLink href="/create" $active={pathname === "/create"}>
        Create
      </NavLink>
      <NavLink href="/piechart" $active={pathname === "/piechart"}>
        Pie Chart
      </NavLink>
    </Bar>
  );
}

const Bar = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 64px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background: var() (--background, #fff);
  border-top: 1px solid var(--border, #e5e7eb);
  z-index: 1000;
`;

const NavLink = styled(Link)`
  display: grid;
  place-items: center;
  font-weight: 600;
  text-decoration: none;
  color: ${({ $active }) => ($active ? "var(--foreground, #000)" : "#6b7280")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#000" : "transparent")};
  padding-bottom: env(safe-area-inset-bottom);
`;
