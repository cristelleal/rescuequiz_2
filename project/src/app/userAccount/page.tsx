'use client';
import UserAccount from './UserAccount';
import ClientComponentUserAccount from './ClientComponentUserAccount';

export default function Page() {
  return (
    <ClientComponentUserAccount>
      <UserAccount />
    </ClientComponentUserAccount>
  );
}
