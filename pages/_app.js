import GlobalStyle from "@/styles";
import { SWRConfig } from "swr";
import { SessionProvider, useSession } from "next-auth/react";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect } from "react";
import { Screen } from "@/components/ui/Primitives";
import Layout from "@/components/Layout";
import BottomNav from "@/components/BottomNav";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light"
    );
  }, []);

  return (
    <SWRConfig
      value={{
        fetcher: async (...args) => {
          const response = await fetch(...args);
          if (!response.ok) {
            throw new Error(`Request with ${JSON.stringify(args)} failed.`);
          }
          return await response.json();
        },
      }}
    >
      <SessionProvider session={session}>
        <Auth>
          <ThemeProvider>
            <GlobalStyle />
            <Screen>
              <Component {...pageProps} />
            </Screen>
            <BottomNav/>
          </ThemeProvider>
        </Auth>
      </SessionProvider>
    </SWRConfig>
  );
}

function Auth({ children }) {
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return children;
}
