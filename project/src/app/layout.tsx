import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ffr">
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
  icons: {
    icon: '/rescuequiz.svg', 
  },
}