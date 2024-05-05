'use client'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import styles from './page.module.css'
import { CategoryTabs } from './components/CategoryTabs';
import { ArticlesList } from './components/ArtciclesList';
import { Header } from "./components/Header";

import { ArticleProvider } from "./contexts/Articles";

export default function Home() {

  return (
    <ArticleProvider>
      <Container maxWidth="xl">
        <Header />

        <section>
          <div className={styles.container}>
            <Typography variant="h2" gutterBottom>
              Latest News
            </Typography>

            <CategoryTabs />

            <ArticlesList />
          </div>
        </section>
      </Container>
    </ArticleProvider>
  );
}
