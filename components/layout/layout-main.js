import Navbar from '../navbar'
import Head from 'next/head'
import Footer from '../footer'

export default function({children}) {
    return [
        <div className="layout">
            <Head>
            </Head>
            <Navbar/>
            <div className="container-fluid p-0">{children}</div>
            <Footer/>
        </div>
    ]
}