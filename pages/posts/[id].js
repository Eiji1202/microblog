import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyle from '../../styles/utils.module.css';

export async function getStaticPaths() {
  // post.jsで定義したgetAllPostIds関数を実行
  const paths = getAllPostIds();

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) { //id, blogContentHTML, title, date, thumbnail
  // post.jsで定義したgetPostData関数を実行
  const postData = await getPostData(params.id);

  return {
    props: {
      postData //id, blogContentHTML, title, date, thumbnail
    }
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyle.headingXl}>{postData.title}</h1>
        <div className={utilStyle.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}