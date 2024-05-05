import React, { useEffect } from 'react'
import { CircularProgress, Grid } from '@mui/material'
import Box from '@mui/material/Box';

import styles from './page.module.css'
import { Article } from '@/app/types'
import { ArticleComponent } from './components/ArticleComponent'
import { useArticlesProvider } from '@/app/contexts/Articles';

export const ArticlesList = () => {
  const { articles, loading, renderMoreArticles } = useArticlesProvider()

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

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    renderMoreArticles();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <div className={styles.GridContainer}>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          {renderArticles(articles)}
        </Grid>
      </Box>

      {loading &&
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
        )}

    </div>
  )
}
