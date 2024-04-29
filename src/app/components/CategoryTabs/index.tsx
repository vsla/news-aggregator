'use client'

import React, { useState } from 'react'

import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const categories: string[] = [
  'General', 'Entertainment', 'Politics', 'Business', 'Tech', 'Art', 'Science', 'Health', 'Sports'
]

export const CategoryTabs = () => {
  const [chipsSelected, setChipsSelected] = useState<string>(categories[0])

  const handleClick = (categoryLabel: string) => {
    setChipsSelected(categoryLabel)
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        {
          categories.map((categoryLabel) => {
            return (
              <Grid item key={categoryLabel} xs='auto'>
                <Chip label={categoryLabel}
                  variant={chipsSelected === categoryLabel ? 'filled' : 'outlined'}
                  onClick={() => handleClick(categoryLabel)} />
              </Grid>
            )
          })
        }
      </Grid>
    </Box>
  )
}
