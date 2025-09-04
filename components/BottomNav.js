import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export default function BottomNav() {
  const { pathname } = useRouter();

  return (
    <BottomNavWrapper>
      <BottomNavContainer role="navigation" aria-label="Main navigation">
        <NavLink href="/" $active={pathname === "/"}>
          Home
        </NavLink>
        <NavLink href="/create" $active={pathname === "/create"}>
          Create
        </NavLink>
        <NavLink href="/piechart" $active={pathname === "/piechart"}>
          Pie Chart
        </NavLink>
      </BottomNavContainer>
    </BottomNavWrapper>
  );
}

const BottomNavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
`;

const BottomNavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 450px;
  border-top: 1px solid #e5e7eb;
  background: var(--background, #fff);
  border-radius: 8px 8px 0 0;
`;

const NavLink = styled(Link)`
  flex: 1;
  text-align: center;
  padding: 12px 0;
  text-decoration: none;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#000" : "#6b7280")};
  border-bottom: 3px solid
    ${({ $active }) => ($active ? "#000" : "transparent")};
`;
