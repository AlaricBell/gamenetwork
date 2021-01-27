import Layout from '../../components/layout/layout-main'
import Date from '../../components/date'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Link from 'next/link'

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
}

export default function Post({postData}) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <Date dateString={postData.date}/>

      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <Link href="/"><button className="btn btn-primary">Back</button></Link>
    </Layout>
      )
}