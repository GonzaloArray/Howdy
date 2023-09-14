import React, { useState } from 'react'

import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'

const Paragraph = styled.p`
    font-size: 0.875rem;
    line-height: 1.25rem;
    display: flex;
    flex-direction: column;
    width: 100%;

    span{
      display: inline;
      align-self: flex-end;
      cursor: pointer;
      color: #C32B8F;
      margin: 0.5rem 0;
    }
`

export const DescriptionPost = ({ description }) => {
  const [showMore, setShowMore] = useState(false)
  const { t } = useTranslation()

  return (
    <Paragraph>
      {description?.length < 100 ? description : showMore ? description : `${description?.substring(0, 100)}... `}
      <span onClick={() => setShowMore(!showMore)}>{description?.length < 100 ? '' : showMore ? (' ...ver menos') : t('HomeLog.Post.Modal.ViewMore')}</span>
    </Paragraph>
  )
}
