'use client'

import React, { useState } from 'react'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

const categories: string[] = [
  'Politics', 'Business', 'Tech', 'Art', 'Science', 'Health', 'Sports'
]

export const CategoryTabs = () => {
  const [chipsSelected, setChipsSelected] = useState<string[]>([])

  const handleClick = (categoryLabel: string) => {
    const hasCategorySelected = chipsSelected.includes(categoryLabel)
    if (hasCategorySelected) {
      const index = chipsSelected.indexOf(categoryLabel);
      chipsSelected.splice(index, 1)
      setChipsSelected([...chipsSelected,])
    } else {
      setChipsSelected([...chipsSelected, categoryLabel])
    }
  };

  const handleClearChips = () => {
    setChipsSelected([])
  }

  return (
    <Stack direction="row" spacing={1}>
      {
        categories.map((categoryLabel) => {
          return (
            <Chip key={categoryLabel} label={categoryLabel}
              variant={chipsSelected.includes(categoryLabel) ? 'filled' : 'outlined'}
              onClick={() => handleClick(categoryLabel)} />
          )
        })
      }

      {chipsSelected.length > 0 && (
        <Chip label="Clear" color='warning' variant="outlined" onClick={handleClearChips} onDelete={handleClearChips} />
      )}
    </Stack>
  )
}
