'use client'
import React from 'react'

import styled from '@emotion/styled'
import { Article } from '@/app/types'
import Image from 'next/image'
import Typography from '@mui/material/Typography';

export const ArticleComponent = ({ article: { title, urlToImage, description, publishedAt } }: { article: Article }) => {

  const articleDate = new Date(publishedAt)

  return (
    <ArticleContainer>
      <ImageComponent src={urlToImage} alt={title}
        width={0}
        height={0}
        sizes="100vw"
      />
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Typography variant="subtitle2" gutterBottom>
        {description}
      </Typography>
      <DateContainer variant='body2'>{articleDate.toDateString()}</DateContainer>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.div`
  margin: 12px;
  
  img{
    &:hover{
      filter: blur(0.05rem);
    }
  }

  &:hover{
   color: #8a2e1b ;
   cursor: pointer;
  }
`

const ImageComponent = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: auto;
  border-radius: 8px;
`

const DateContainer = styled(Typography)`
  color: #7c7c7c
`