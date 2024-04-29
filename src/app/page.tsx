import Typography from '@mui/material/Typography';

import styles from './page.module.css'
import { CategoryTabs } from './components/CategoryTabs';

export default function Home() {
  return (
    <div className={styles.container}>
      <Typography variant="h2" gutterBottom>
        Latest News
      </Typography>

      <CategoryTabs />
    </div>
  );
}
