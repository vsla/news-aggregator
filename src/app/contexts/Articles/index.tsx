import { Article } from '@/app/types'
import { createContext, useContext, useState, useEffect } from 'react'

type ArticlesContextProps = {
  articles: Article[],
  // fetchArticles: () => {}
  // loading: boolean,

}

const ArticlesContext = createContext({} as ArticlesContextProps)

export function ArticleProvider({ children }) {
  const [articles, setArticles] = useState<Article[]>([])
  return (
    <ArticlesContext.Provider value={{
      articles
    }}>
      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticlesProvider = () => useContext(ArticlesContext)