import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
          
        <ButtonAuth onClick={() => signOut()}>Sign out</ButtonAuth>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

const ButtonAuth = styled.button`
  color: var(--foreground);
  margin-bottom: 5px;
  padding: 12px 11px ;
`;
