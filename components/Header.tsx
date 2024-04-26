import Link from "next/link"
import siteData from "@/data/site.json";

export default function Header() {
    return (
        <header>

            <div className="logo text-center font-bold">
                <Link href="/">{siteData.siteTitle} <sub className="locale">{siteData.siteLocale}</sub></Link>
            </div>
            
        </header>
    )
}
