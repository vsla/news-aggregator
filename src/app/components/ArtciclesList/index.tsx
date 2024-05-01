import React from 'react'
import { ArticlesMockList } from '@/app/mocks/ArticleListMock'
import { Grid } from '@mui/material'
import Box from '@mui/material/Box';

import styles from './page.module.css'
import { Article } from '@/app/types'
import { ArticleComponent } from './components/ArticleComponent'

export const ArticlesList = () => {

  function splitToNChunks<T>(array: T[], n: number) {
    let result = [];
    for (let i = n; i > 0; i--) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }

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
    sm: 12,
    md: 12
  }) => {
    return (array.map((article) => {
      return renderArticle(article, positions)
    }))
  }

  const Articles = splitToNChunks<Article>(ArticlesMockList.articles, 3)

  return (
    <div className={styles.GridContainer}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={3}>
            <Grid container>
              {renderArticles(Articles[0])}
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container>
              {renderArticles(Articles[1])}
            </Grid>
          </Grid>

          <Grid item xs={12} md={3}>
            <Grid container>
              {renderArticles(Articles[2])}
            </Grid>
          </Grid>

        </Grid>
      </Box>
    </div>
  )
}
