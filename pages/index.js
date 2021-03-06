import Head from 'next/head';
import Link from "next/link";

import { getSortedPostData } from "../lib/posts";

import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";

import utilStyles from "../styles/utils.module.css";


export async function getStaticProps() {
  const allPostsData = getSortedPostData();
  return {
    props: {
      allPostsData
    }
  }
}

// IF YOU WERE GETTING PROPS VIA SERVER-SIDE RENDERING
// BECAUSE YOUR DATA WOULD CHANGE REQUEST BY REQUEST
// export async function getServerSideProps(context) {
//   return {
//     props: {}
//   }
// }

// YOU can also just use Client-Side Rendering to get data
// IE just pre-render the static parts of page and fetch data
// like a dashboard


export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you'll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} {...date}/>
              </small>
            </li>
          ))}
        </ul>
      </section>

    </Layout>
  )
}