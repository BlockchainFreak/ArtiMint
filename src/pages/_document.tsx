import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div>
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
