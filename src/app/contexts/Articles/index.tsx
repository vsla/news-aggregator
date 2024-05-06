'use client'
import { Article } from '@/app/types'
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { fetchArticles } from './actions/fetchArticles'
import { categoriesEnum, categoryType } from '@/app/enums'

type ArticlesContextProps = {
  articles: Article[],
  renderMoreArticles: () => {},
  getArticles: () => {},
  loading: boolean,
  categoryFilter: string,
  changeCategoryFilter: (category: categoryType) => void

  searchFilter: string,
  changeSearchFilter: (category: string) => void
}

const ArticlesContext = createContext({} as ArticlesContextProps)

export function ArticleProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [categoryFilter, setCategoryFilter] = useState<categoryType>(categoriesEnum[0])
  const [searchFilter, setSearchFilter] = useState<string>('')

  const [page, setPage] = useState<number>(1)

  const renderMoreArticles = async () => {
    setLoading(true)
    const articleList = await fetchArticles(page, categoryFilter, searchFilter)
    setArticles([...articles, ...articleList.articles])
    setPage(page + 1)
    setLoading(false)
  }

  const getArticles = async (newCategory?: categoryType, newSearch?: string) => {
    setLoading(true)
    setArticles([])
    const articleList = await fetchArticles(page, newCategory || categoryFilter, newSearch || searchFilter)
    setArticles(articleList.articles)
    setPage(page + 1)
    setLoading(false)
  }

  const changeCategoryFilter = async (newCategory: categoryType) => {
    setCategoryFilter(newCategory)
    getArticles(newCategory, searchFilter)
  }

  const changeSearchFilter = async (newSearch: string) => {
    setSearchFilter(newSearch)
    getArticles(categoryFilter, newSearch)
  }

  useEffect(() => {
    getArticles()
  }, [])

  return (
    <ArticlesContext.Provider value={{
      articles,
      loading,
      getArticles,
      renderMoreArticles,
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
