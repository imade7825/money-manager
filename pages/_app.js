import GlobalStyle from "@/styles";
import { SWRConfig } from "swr";
import { SessionProvider, useSession } from "next-auth/react";
import { Layout } from "@/components/ui/Primitives";
import BottomNav from "@/components/BottomNav";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
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
        <GlobalStyle />
        <Auth>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <BottomNav />
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
