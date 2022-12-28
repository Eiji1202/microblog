import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from '../lib/post'
import styles from '../styles/Home.module.css'
import utilStyle from '../styles/utils.module.css'

// SSGで外部からデータを取得する関数
export async function getStaticProps() {
  // post.jsからgetPostsDataを読み込んで実行
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyle.headingMd}>2022年12月からフロントエンドエンジニアとして働き始めました。</p>
      </section>

      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyle.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>

    </Layout>
  )
}
