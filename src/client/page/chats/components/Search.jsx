import React from 'react'

import { styled } from 'styled-components'

import SearchIcon from '@mui/icons-material/Search'
import { primary10, primary80 } from '../../../../common/variables'
import { useTranslation } from 'react-i18next'

const SearchContainer = styled.div`
  
  .searchForm {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    margin: 4px;
    border-radius: 100px;
    background-color: ${primary10};

    input {
      border: none;
      outline: none;
      width: 100%;
      padding-left: 16px;

      &::placeholder{}
    }

    span {
      color: ${primary80};
    }
  }
`

const Search = () => {
  const { t } = useTranslation()

  return (
    <SearchContainer>
      <div className='searchForm'>
        <input
          type='text'
          placeholder={t('Chat.Search')}
        />
        <span><SearchIcon /></span>
      </div>
    </SearchContainer>
  )
}

export default Search
