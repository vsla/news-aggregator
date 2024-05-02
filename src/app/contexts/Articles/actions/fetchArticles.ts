import { Article } from "@/app/types"

export type fetchArticlesResponse = {
  total: number,
  articles: Article[]
}

type newsApiArticle = {
  title: string,
  description: string,
  urlToImage: string,
  publishedAt: string
}

type theGuardianArticleAsset = {
  file: string,
  typeData: {
    width: string
  }
}

type theGuardianArticle = {
  webPublicationDate: string
  webTitle: string
  webUrl: string,
  type: string,
  elements: Array<
    {
      assets: theGuardianArticleAsset[]
    }>
}

const formatTheGuardian = (articles: theGuardianArticle[]) => {
  const formattedArticles: Article[] = []

  const findTheLargerImage = (assets: theGuardianArticleAsset[]) => assets.find(({ typeData: {
    width
  } }) => {

    return width === '1000'
  })

  articles.forEach((
    { webPublicationDate,
      webTitle,
      elements, type }
  ) => {

    if (elements && type === 'article') {

      const assets = elements[0].assets
      const imageUrl = findTheLargerImage(assets)?.file || ''

      formattedArticles.push({
        title: webTitle,
        description: '',
        urlToImage: imageUrl,
        publishedAt: webPublicationDate
      })
    }
  })

  return formattedArticles
}

const removeArticleWithoutImagesFromNewsApi = (articles: newsApiArticle[]) => {

  return articles.filter(({ urlToImage }) => urlToImage !== null)
}

export async function fetchArticles() {
  const { NEWS_API_API_KEY, THE_GUARDIAN_API_KEY } = process.env

  const response1: Promise<{ articles: newsApiArticle[] }> = fetch(`https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_API_KEY}&sources=bbc-news`, { next: { revalidate: 0 } }).then((response) => response.json())
  const response2: Promise<{ response: { results: theGuardianArticle[] } }> = fetch(`https://content.guardianapis.com/search?show-elements=image&api-key=${THE_GUARDIAN_API_KEY}`, { next: { revalidate: 0 } }).then((response) => response.json())

  let articles: Article[] = []
  await Promise.all([response1, response2]).then((values) => {

    const formattedGuardian = formatTheGuardian(values[1].response.results)
    const formattedNewsApi = removeArticleWithoutImagesFromNewsApi(values[0].articles)

    articles = [...formattedGuardian, ...formattedNewsApi,]
  });

  return {
    total: 0,
    articles: articles
  }
}