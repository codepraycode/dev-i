
import { Html, Head, Main, NextScript } from 'next/document'
import siteData from "@/data/site.json";


export default function Document() {
    return (
        <Html lang="en">
            <title>{siteData.siteTitle} / {siteData.siteDescription}</title>
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
