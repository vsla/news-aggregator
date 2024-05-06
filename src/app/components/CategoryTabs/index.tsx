'use client'

import React from 'react'

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { categoriesEnum, categoryType } from '@/app/enums';
import { useArticlesProvider } from '@/app/contexts/Articles';

export const CategoryTabs = () => {
  const { categoryFilter, changeCategoryFilter } = useArticlesProvider()

  const handleClick = (categoryLabel: categoryType) => {
    changeCategoryFilter(categoryLabel)
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {
          categoriesEnum.map((categoryLabel) => {
            return (
              <Grid item key={categoryLabel} xs='auto'>
                <Chip label={categoryLabel}
                  variant={categoryFilter === categoryLabel ? 'filled' : 'outlined'}
                  onClick={() => handleClick(categoryLabel)} />
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}
