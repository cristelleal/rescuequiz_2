'use client';
import SignUp from "./SignUp";
import ClientComponentSignUp from "./ClientComponentSignUp";

export default function Page() {
  return (
    <ClientComponentSignUp>
      <SignUp />
    </ClientComponentSignUp>
  );
}
