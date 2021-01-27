import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section>
        <h2>Blog</h2>
        <ul >
          {allPostsData.map(({ id, date, title }) => (
            <li key={id}>
              <Link href={`/posts/${id}`}><a>{title} - {date}</a></Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
