'use client'
import React from 'react'

import styled from '@emotion/styled'
import { Article } from '@/app/types'
import Image from 'next/image'
import Typography from '@mui/material/Typography';

export const ArticleComponent = ({ article: { title, urlToImage, description, } }: { article: Article }) => {
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
        {description} <span></span>
      </Typography>
    </ArticleContainer>
  )
}

const ArticleContainer = styled.div`
  margin: 12px;
  &:hover{
   color: #595959 ;
   cursor: pointer;
  }
`

const ImageComponent = styled(Image)`
  object-fit: contain;
  width: 100%;
  height: auto;
`