import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
  /* Persian Blue */
  --pb-50:#e8f6ff;
  --pb-100:#d4eeff; 
  --pb-200:#b3dcff; 
  --pb-300:#85c3ff;
  --pb-400:#559aff; 
  --pb-500:#2e70ff; 
  --pb-600:#0b43ff; 
  --pb-700:#0239ff;
  --pb-800:#0532c7; 
  --pb-900:#0f34a0; 
  --pb-950:#091d5d;

  /* Light base */
  --background:#ffffff; 
  --foreground:#111111;
  --surface:#f7f9fc; 
  --surface-elevated:#ffffff;
  --muted:#6b7280; 
  --muted-foreground:#6b7280;
  --border:#e5e7eb;
  --primary:var(--pb-600); 
  --primary-contrast:#ffffff;

  

  

  --positive:#16a34a; 
  --negative:#dc2626;
  --radius:16px; 
  --radius-sm:10px;
  --shadow:0 6px 18px rgba(0,0,0,.08);
  --focus-ring:2px solid var(--pb-500);

}

@media (prefers-color-scheme: dark){
  :root{
    --background:#0b0f14; 
    --foreground:#e6e6e6;
    --surface:#0f141a; 
    --surface-elevated:#11161c;
    --muted:#9aa0a6; 
    --muted-foreground:#9aa0a6;
    --border:#2a2f36;
    --primary:var(--pb-500); 
    --primary-contrast:#ffffff;
    --positive:#22c55e; 
    --negative:#f87171;
  }
}
/* a11y */
*:focus-visible{
  outline: 3px solid var(--focus-ring, #0b43ff);
  outline-offset: 2px;
   
}


html[data-theme="light"]{
  --background:#ffffff; 
  --foreground:#111111;
  --surface:#f7f9fc; 
  --surface-elevated:#ffffff;
  --muted:#6b7280; 
  --muted-foreground:#6b7280;
  --border:#e5e7eb; 
  --primary:var(--pb-600); 
  --primary-contrast:#fff;
}
html[data-theme="dark"]{
  --background:#0b0f14; 
  --foreground:#e6e6e6;
  --surface:#0f141a; 
  --surface-elevated:#11161c;
  --muted:#9aa0a6;
  --muted-foreground:#9aa0a6;
  --border:#2a2f36; 
  --primary:var(--pb-500); 
  --primary-contrast:#fff;
  
}

/* Baseline */
*,*::before,*::after{ box-sizing:border-box; }
html, body, #__next{ min-height:100%; }
body{
  margin:0; 
  background:
     radial-gradient(1200px 800px at 5% 1%,
       var(--pb-800) 10%,
       transparent 10%)
     ,radial-gradient(1000px 700px at 100% 100%,
       var(--pb-700) 0%,
       transparent 55%)
     ,var(--background);
  color:var(--foreground);
  font-family: system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif;
}

body{
  padding: 10px;
}

/* Elements */
button{
  font:inherit; 
  border:1px solid var(--border);
  background:var(--surface-elevated); 
  color:var(--foreground);
  border-radius:var(--radius-sm); 
  padding:.55rem .8rem; cursor:pointer;
}
button:disabled{ opacity:.6; cursor:not-allowed; }
input,select{
  font:inherit; 
  color:var(--foreground); 
  background:var(--surface-elevated);
  border:1px solid var(--border); 
  border-radius:var(--radius-sm);
  padding:.5rem .6rem;
  width: 100%;
}
label{
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 0.9rem;
}

/* Focus sichtbar */
:where(a,button,input,select,textarea,[role="tab"],[role="link"]):focus-visible{
  outline: var(--focus-ring); 
  outline-offset:2px;
}
`;
export default GlobalStyle;
