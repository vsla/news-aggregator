import React from 'react'

import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { useArticlesProvider } from '@/app/contexts/Articles';

export const SearchBar = () => {
  const { changeSearchFilter } = useArticlesProvider()
  return (
    <form noValidate autoComplete="off" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget);

      const searchValue = formData.get('search') as string
      changeSearchFilter(searchValue)
    }}>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          name='search'
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
    </form>
  )
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha('#bbbbbb', 0.15),
  '&:hover': {
    backgroundColor: alpha('#bbbbbb', 0.25),
  },
  marginLeft: 0,
  width: '16ch',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),

    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));