import styled from "styled-components";
import { useSession, signIn, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";

export default function AuthButtons() {
  const { data: session } = useSession();
  const { t: translate } = useTranslation("common");

  if (session) {
    return (
      <>
        <ButtonAuth onClick={() => signOut()}>{translate("auth.signOut")}</ButtonAuth>
      </>
    );
  }
  return (
    <>
      {translate("auth.notSignedIn")} <br />
      <button onClick={() => signIn()}>{translate("auth.signIn")}</button>
    </>
  );
}

const ButtonAuth = styled.button`
  color: var(--foreground);
  margin: 5px;
  padding: 12px 11px;
`;
