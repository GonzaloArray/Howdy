import React, { useState } from 'react'
import { Button } from '@mui/material'

import { Title } from '../../../components/Title'
import { SelectNativeLanguage } from '../components/SelectNativeLanguage'
import { useTranslation } from 'react-i18next'

export const Step3 = ({ register, errors, watch }) => {
  const { t } = useTranslation()

  const [componentCount, setComponentCount] = useState(1)

  const handleClick = () => {
    if (componentCount <= 2) {
      setComponentCount((prevCount) => prevCount + 1)
    }
  }

  return (
    <>
      <Title
        title={t('Register.Steps.Step3.Title')}
        description={t('Register.Steps.Step3.Desc')}
      />

      {Array.from({ length: componentCount }).map((_, index) => (
        <SelectNativeLanguage
          componentCount={componentCount >= 1}
          key={index}
          register={register}
          errors={errors}
          watch={watch}
        />
      ))}

      <Button
        sx={{ textTransform: 'none', justifyContent: 'start' }}
        color='secondary'
        size='small'
        variant='text'
        onClick={handleClick}
      >
        {t('Register.Steps.Step3.Button')}
      </Button>
    </>
  )
}
