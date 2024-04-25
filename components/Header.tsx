import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header>

            <div className="logo text-center font-bold">
                <Link href="/">Dev[i]</Link>
            </div>
            
        </header>
    )
}
