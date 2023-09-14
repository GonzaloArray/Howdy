import React from 'react'
import { Title } from '../../../components/Title'
import { UploadImage } from '../components/UploadImage'
import { useTranslation } from 'react-i18next'

export const Step6 = ({ register, errors, setValue, watch }) => {
  const { t } = useTranslation()

  return (
    <>
      <Title
        title={t('Register.Steps.Step6.Title')}
        description={t('Register.Steps.Step6.Desc')}
      />
      <UploadImage
        name='selectedImageProfile'
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />
    </>
  )
}
