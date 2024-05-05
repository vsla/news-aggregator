'use client'
import { categoriesEnum, categoryToEndpoints, categoryType } from "@/app/enums"
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
  type: string,
  elements: Array<
    {
      assets: theGuardianArticleAsset[]
    }>
}

type multimediaNYT = {
  format: string,
  width: string,
  url: string,
  type: string
}

type NYTArticle = {
  title: string
  abstract: string,
  item_type: string,
  created_date: string
  multimedia: multimediaNYT[]
}

const formatNYT = (articles: NYTArticle[]) => {
  const formattedArticles: Article[] = []

  const findTheLargerImage = (assets: multimediaNYT[]) => assets.find(({ format }) => {
    return format === 'mediumThreeByTwo440'
  })

  articles.forEach((
    { abstract,
      title,
      multimedia, item_type, created_date }
  ) => {

    if (multimedia && item_type === 'Article') {

      const imageUrl = findTheLargerImage(multimedia)?.url || ''

      formattedArticles.push({
        title,
        description: abstract,
        urlToImage: imageUrl,
        publishedAt: created_date
      })
    }
  })

  return formattedArticles
}

const formatTheGuardian = (articles: theGuardianArticle[]) => {
  const formattedArticles: Article[] = []

  const findTheLargerImage = (assets: theGuardianArticleAsset[]) => assets.sort(({ typeData: {
    width: w1
  } }, { typeData: {
    width: w2
  } }) => {

    return parseInt(w2) - parseInt(w1)
  })[0]

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

const createNewsFetchUrl = (categoryFilter: categoryType,
  searchFilter?: string) => {
  const apiCategory = categoryToEndpoints.news[categoryFilter]
  return `https://newsapi.org/v2/top-headlines?apiKey=${process.env.NEXT_PUBLIC_NEWS_API_API_KEY}${apiCategory && `&category=${apiCategory}`}`
}

const createTheGuardianFetchUrl = (categoryFilter: categoryType,
  searchFilter?: string) => {
  const apiSection = categoryToEndpoints.guardian[categoryFilter]
  return `https://content.guardianapis.com/search?show-elements=image&api-key=${process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY}${apiSection && `&section=${apiSection}`}`
}
const createNYTFetchUrl = (categoryFilter: categoryType,
  searchFilter?: string) => {
  const apiSection = categoryToEndpoints.nty[categoryFilter]
  return `https://api.nytimes.com/svc/topstories/v2/${apiSection}.json?api-key=${process.env.NEXT_PUBLIC_NYT_API_KEY}`
}

export async function fetchArticles(
  categoryFilter: categoryType,
  searchFilter?: string) {

  const response1: Promise<{ articles: newsApiArticle[] }> = fetch(createNewsFetchUrl(categoryFilter, searchFilter), { next: { revalidate: 0 } }).then((response) => response.json())
  const response2: Promise<{ response: { results: theGuardianArticle[] } }> = fetch(createTheGuardianFetchUrl(categoryFilter, searchFilter), { next: { revalidate: 0 } }).then((response) => response.json())
  const response3: Promise<{ results: NYTArticle[] }> = fetch(createNYTFetchUrl(categoryFilter, searchFilter), { next: { revalidate: 0 } }).then((response) => response.json())

  let articles: Article[] = []
  await Promise.all([response1, response2, response3]).then((values) => {

    const formattedNewsApi = removeArticleWithoutImagesFromNewsApi(values[0].articles)
    const formattedGuardian = formatTheGuardian(values[1].response.results)
    const formattedNYT = formatNYT(values[2].results)

    articles = [...formattedGuardian, ...formattedNewsApi, ...formattedNYT]
  });

  return {
    total: articles.length,
    articles: articles
  }
}