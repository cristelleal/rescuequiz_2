'use client';
import Auth from "./Auth";
import ClientComponentAuth from "./ClientComponentAuth";

export default function Page() {
  return (
    <ClientComponentAuth>
      <Auth />
    </ClientComponentAuth>
  );
}
