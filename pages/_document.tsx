
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <main className={`min-h-screen p-14 w-full bg-[#f7f7f9]`}>
                    <Main />
                </main>
                <NextScript />
            </body>
        </Html>
    )
}
