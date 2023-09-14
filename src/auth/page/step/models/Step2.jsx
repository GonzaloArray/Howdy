import React from 'react'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { Title } from '../../../components/Title'
import { SelectLan } from '../../../components/SelectLan'
import { nativeLanguage } from '../constants/data'
import { useTranslation } from 'react-i18next'

export const Step2 = ({ register, errors, watch }) => {
  const { t } = useTranslation()

  return (
    <>
      <Title title={t('Register.Steps.Step2.Title')} description={t('Register.Steps.Step2.Desc')} />

      <SelectLan
        label={t('Register.Steps.Step2.Label')}
        name='selectorLan'
        items={nativeLanguage}
        register={register}
        errors={errors}
        icon={<ChatBubbleOutlineIcon />}
        watch={watch}
      />
    </>
  )
}
