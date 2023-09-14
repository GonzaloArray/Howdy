import React from 'react'
import TranslateIcon from '@mui/icons-material/Translate'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import { SelectInput } from '../../../components/SelectInput'
import { levelOfKnowledge, nativeLanguage } from '../constants/data'
import { Typography } from '@mui/material'
import { SelectLan } from '../../../components/SelectLan'
import { useTranslation } from 'react-i18next'

export const SelectNativeLanguage = ({ componentCount, register, errors, watch }) => {
  const { t } = useTranslation()

  const data = watch('selectorLan').value

  return (
    <>
      {
        componentCount && <Typography>{t('Register.Steps.Step3.SubTitle')}</Typography>
      }
      <SelectLan
        label={t('Register.Steps.Step3.LanLabel')}
        name='selectorLanguage'
        items={nativeLanguage?.filter(lan => lan.value !== data)}
        register={register}
        errors={errors}
        icon={<TranslateIcon />}
        watch={watch}
      />

      <SelectInput
        label={t('Register.Steps.Step3.LvlLabel')}
        name='selectorKnowledge'
        items={levelOfKnowledge}
        register={register}
        errors={errors}
        icon={<EqualizerIcon />}
        watch={watch}
      />
    </>
  )
}
