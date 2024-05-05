'use client'
import { Article } from '@/app/types'
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { fetchArticles } from './actions/fetchArticles'
import { categoriesEnum, categoryType } from '@/app/enums'

type ArticlesContextProps = {
  articles: Article[],
  getArticles: () => {}
  loading: boolean,
  categoryFilter: string,
  changeCategoryFilter: (category: string) => void

  searchFilter: string,
  changeSearchFilter: (category: string) => void
}

const ArticlesContext = createContext({} as ArticlesContextProps)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [categoryFilter, setCategoryFilter] = useState<categoryType>(categoriesEnum[0])
  const [searchFilter, setSearchFilter] = useState<string>('')

  const getArticles = async (newCategory?: categoryType) => {
    setLoading(true)
    const articleList = await fetchArticles(newCategory || categoryFilter, searchFilter)
    setArticles(articleList.articles)
    setLoading(false)
  }

  const changeCategoryFilter = async (newCategory: categoryType) => {
    setCategoryFilter(newCategory)
    getArticles(newCategory)
  }

  const changeSearchFilter = async (newSearch: categoryType) => {
    setSearchFilter(newSearch)
    getArticles()
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <ArticlesContext.Provider value={{
      articles,
      loading,
      getArticles,
      categoryFilter,
      changeCategoryFilter,
      searchFilter,
      changeSearchFilter
    }}>

      {children}
    </ArticlesContext.Provider>
  )
}

export const useArticlesProvider = () => useContext(ArticlesContext)
