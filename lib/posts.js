import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostData() {
  // Get file name under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map(fileName => {
    // replace ".md" from filename to get id
    const id = fileName.replace(/\.md$/, "");

    // read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // use gray-matter to parse post metadata section
    const matterResult = matter(fileContents);

    // Combine data with id
    return {
      id,
      ...matterResult.data
    }
  })

  // Sort posts by date
  return allPostsData.sort( ({date:a}, {date:b}) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function asyncGetSortedPostsData() {
  // fetch post data from external API endpoint instead of file system
  const res = await fetch("...");
  return res.json();
}

// YOU CAN ALSO QUERY DATABASE DIRECTLY
// BECAUSE getStaticProps ONLY RUNS ON SERVERSIDE
// NEVER ON CLIENTSIDE
// 
// import someDatabaseSDK from "someDatabaseSDK";
// const datbaseClient = someDatabaseSDK.createClient(...)
// export async function getSortedPostsData() {
//    return databaseClient.query("SELECT posts...") ;
// }

// you won't be able to access request time data such as query parameters or HTTP headers
// static props are fetched at BUILD TIME

// getStaticProps can only be exported from a page - not from non-page files

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // use gray-matter to parse the post metadata
  const matterResult = matter(fileContents);


  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();


  // Combine the data with id
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}


// Return list of file names in the posts directory
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Return array looks like:
  // [
  //   {
  //     params: { id: "ssg-ssr" }
  //   },
  //   {
  //     params: { id: "pre-rendering" }
  //   }
  // ]
  // MUST return array of objects with params field,
  // with a field for id since [id] is the dynamic route file
  return fileNames.map(fileName => ({
    params: {
      id: fileName.replace(/\.md$/, "") 
    }
  }));
}