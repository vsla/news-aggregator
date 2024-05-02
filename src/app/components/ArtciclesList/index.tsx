import React from 'react'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';

import styles from './page.module.css'
import { Article } from '@/app/types'
import { ArticleComponent } from './components/ArticleComponent'
import { fetchArticles } from '@/app/contexts/Articles/actions/fetchArticles';

export const ArticlesList = async () => {
  const articleList = await fetchArticles()

  const renderArticle = (article: Article, positions: { xs: number, sm: number, md: number }) => {
    const { xs, sm, md } = positions
    return (
      <Grid item xs={xs} sm={sm} md={md} key={article.title}>
        <ArticleComponent key={article.title} article={article} />
      </Grid>
    )
  }

  const renderArticles = (array: Article[], positions: { xs: number, sm: number, md: number } = {
    xs: 12,
    sm: 4,
    md: 3
  }) => {
    return (array.map((article) => {
      return renderArticle(article, positions)
    }))
  }

  return (
    <div className={styles.GridContainer}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {renderArticles(articleList.articles)}
        </Grid>
      </Box>
    </div>
  )
}
