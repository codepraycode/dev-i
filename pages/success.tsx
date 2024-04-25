import Header from '@/components/Header'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

export default function SuccessPage() {
  return (
    <>
            <Header />
            <br/><br/><br/>


            <section className="container" >

                <h1 className='text-h1'>You&apos;ve been index!</h1>
                <br/>
                <p>We&apos;ve saved your information, and will alert you of oppourtunities that match your details</p>
                <br/><br/>

                <Link href={"/"} className="btn-link">
                    Index another developer
                </Link>
            </section>

            <br/><br/><br/>


        </>
  )
}
