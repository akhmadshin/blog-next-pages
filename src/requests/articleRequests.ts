export async function fetchArticles() {
  const res = await fetch(`http://localhost:3000/api/blog/`, {
    cache: 'no-cache',
  });
  const articles = (await res.json()) as any;
  return articles as any[];
}


export async function fetchArticle(slug: string) {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}/`, {cache: 'no-cache'});
  const article = (await res.json()) as any;
  return article;
}


