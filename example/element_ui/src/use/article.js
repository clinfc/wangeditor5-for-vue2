import ArticleList from '../assets/json/article.json'

export function getArticle() {
  return ArticleList.map(({ title }, index) => ({ label: title, value: index }))
}

export function getArticleJson(index) {
  if (ArticleList[index]) return ArticleList[index].content
  return []
}

export function getArticleHtml(index) {
  if (ArticleList[index]) return ArticleList[index].html
  return ''
}
