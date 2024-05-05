import React, { Suspense } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import Box from '@mui/material/Box';

import styles from './page.module.css'
import { Article } from '@/app/types'
import { ArticleComponent } from './components/ArticleComponent'
import { useArticlesProvider } from '@/app/contexts/Articles';

export const ArticlesList = () => {
  const { articles, loading, } = useArticlesProvider()

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
      {loading ?
        (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: '10px'
            }}
          >
            <CircularProgress color='primary' />
          </Box>
        ) : (
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              {renderArticles(articles)}
            </Grid>
          </Box>
        )
      }

    </div>
  )
}
