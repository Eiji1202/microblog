import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'
import { remark } from 'remark';
import html from 'remark-html';

// 投稿データを取得するファイル

// 投稿データの入っているpostsフォルダのpathを取得
const postsDirectory = path.join(process.cwd(), "posts");

// mdファイルのデータを取り出す
export function getPostsData() {
  // postsフォルダの中のファイル名が配列として格納される
  // fileNames = ['pre-rendering-about.md', 'pre-rendering.md', 'react-next.md', 'ssg-ssr.md']
  const fileNames = fs.readdirSync(postsDirectory);

  // map関数で一つ一つ取り出す
  const allPostsData = fileNames.map((fileName) => {
    // .mdの拡張子を取り除いたファイル名をidとする
    const id = fileName.replace(/\.md$/, "");

    // マークダウンファイルを文字列として読み取る

    // fullPathを取得                                                                  
    const fullPath = path.join(postsDirectory, fileName);
    // ファイルの中身をutf-8で読み取って取得
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // 記事の中のmetaデータを分析
    const matterResult = matter(fileContents);

    // id(ファイル名)と分析したmetaデータを返す
    return {
      id,
      ...matterResult.data //title, date, thumbnail
    };
  });
  return allPostsData;
}

// getStaticPathsで使うpathを取得してオブジェクトで返す
export function getAllPostIds() {

  // ファイル名を取得
  // fileNames = ['pre-rendering-about.md', 'pre-rendering.md', 'react-next.md', 'ssg-ssr.md']
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        // .mdの拡張子を取り除いたファイル名をidとして返す
        id: fileName.replace(/\.md$/, "")
      }
    }
    /**
     * [
     *  {
     *    params: {
     *      id: pre-rendering-about
     *    }
     *  },
     *  {
     *    params: {
     *      id: pre-rendering
     *    }
     *  },
     *  {
     *    params: {
     *      id: react-next
     *    }
     *  },
     *  {
     *    params: {
     *      id: ssg-ssr
     *    }
     *  }
     * ]
     */
  })
}

// idに基づいてブログ投稿データを返す
export async function getPostData(id) {
  // fullPathを取得                                                         
  const fullPath = path.join(postsDirectory, `${id}.md`);
  // ファイルの中身をutf-8で読み取って取得
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  // 記事の中のmetaデータを分析
  const matterResult = matter(fileContent);

  // 記事の本文をhtmlに変換する
  const blogContent = await remark().use(html).process(matterResult.content);
  // 文字列に変換
  const blogContentHTML = blogContent.toString();

  return {
    id, // ファイル名
    blogContentHTML, //記事の本文
    ...matterResult.data //title, date, thumbnail
  }
}