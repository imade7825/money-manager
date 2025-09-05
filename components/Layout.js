import styled from "styled-components";
import BottomNav from "./BottomNav";
import ThemeToggle from "./ThemeToggle";
import AuthButtons from "./AuthButtons";

export default function Layout({ children }) {
  return (
    <div style={{ "--bottom-nav-height": "72px" }}>
      <AppHeader>
        <AppHeaderContentRow>
          <AuthButtons />
          <ThemeToggle />
        </AppHeaderContentRow>
      </AppHeader>
      <MainContent>{children}</MainContent>
      <BottomNav />
    </div>
  );
}

const AppHeader = styled.header`
  background: var(--background, #fff);
  border-bottom: 1px solid var(--border, #e5e7eb);
`;

const AppHeaderContentRow = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 450px;
  margin: 0 auto;
  padding: 0 12px;
`;

const MainContent = styled.main`
  width: 100%;
  max-width: 450px;
  margin: 0 auto;
  padding: 12px;
  padding-bottom: calc(var(--bottom-nav-height, 72px));
`;
