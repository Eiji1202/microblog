import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'

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