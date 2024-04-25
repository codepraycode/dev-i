
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <title>Dev[i] / Where developers are Indexed</title>
            <Head />
            <body>
                <main className={`min-h-screen w-full bg-[#f7f7f9]`}>
                    <Main />
                </main>
                <NextScript />
            </body>
        </Html>
    )
}
