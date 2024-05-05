export type categoryType = 'General' | 'Entertainment' | 'Business' | 'Science' | 'Health' | 'Sports'

export const categoriesEnum: categoryType[] = [
  'General', 'Entertainment', 'Business', 'Science', 'Health', 'Sports'
]

export const categoryToEndpoints = {
  news: {
    'General': 'general',
    'Entertainment': 'entertainment',
    'Business': 'business',
    'Science': 'science',
    'Health': 'health',
    'Sports': 'sports',
  },
  guardian: {
    'General': '',
    'Entertainment': 'culture',
    'Business': 'business',
    'Science': 'science',
    'Health': 'wellness',
    'Sports': 'sport',
  },
  nty: {
    'General': '',
    'Entertainment': 'automobiles',
    'Business': 'business',
    'Science': 'science',
    'Health': 'health',
    'Sports': 'sports',
  }
}