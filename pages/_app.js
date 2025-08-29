
import GlobalStyle from "@/styles";
import { ThemeProvider } from "@/context/ThemeContext";
import  { SWRConfig } from "swr";
export default function App({ Component, pageProps }) {
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
    <ThemeProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
    </SWRConfig>
  );
}
