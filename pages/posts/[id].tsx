import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";

import { getAllPostIds, getPostData } from "../../lib/posts";

import Layout from "../../components/layout";
import Date from "../../components/date";

import utilStyles from "../../styles/utils.module.css";

// Statically generate a page using Dynamic Routes
export default function Post({ postData }: {
  postData: { 
    title: string;
    date: string;
    contentHtml: string;
  }
}) {
  return (
    <Layout>

      <Head>
        <title>{postData.title}</title>  
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>
          {postData.title}
        </h1>
        
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />    
        </div>

        <div dangerouslySetInnerHTML={{__html:postData.contentHtml}} />
        
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Return a list of possible values for 'id' - POSSIBLE PATHS
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // fetch data for the specific blog post using params.id
  // params uses the path - path to this file is posts/[id]
  const postData = await getPostData(params.id as string);
  return {
    props: { postData }
  };
}