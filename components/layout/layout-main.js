import Navbar from '../navbar'
import Head from 'next/head'
import Footer from '../footer'

export default function Layout({children, ...pageProps}) {
    return [
        <div className="layout">
            <Head>
                
            </Head>
            <Navbar games={pageProps.games}/>
            <div className="container-fluid p-0">{children}</div>
            <Footer/>
        </div>
    ]
}