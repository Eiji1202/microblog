import Head from "next/head";
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from "next/link";

const name = 'Shin Code'
export const siteTitle = 'Next.js Blog'

function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {/* Layoutにhomeという変数がついている場合 */}
        {home ? (
          <>
            <img src="/images/profile.png" className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <img src="/images/profile.png" className={utilStyles.borderCircle} />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}

      </header>
      <main>{children}</main>
      {/* ９Layoutにhomeという変数がついていない場合 = homeじゃない場合 */}
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}

export default Layout;