import React from 'react'
import { Title } from '../../../components/Title'
import { TextField } from '@mui/material'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import { sex } from '../constants/data'
import { SelectInput } from '../../../components/SelectInput'
import { useTranslation } from 'react-i18next'

export const Step5 = ({ register, errors, watch }) => {
  const { t } = useTranslation()
  return (
    <>
      <Title title={t('Register.Steps.Step5.Title1')} description={t('Register.Steps.Step5.Desc1')} />
      <TextField
        label={t('Register.Steps.Step5.Label1')}
        placeholder={t('Register.Steps.Step5.Placeholder1')}
        rows={4}
        multiline
        value={watch('selectedDescription')}
        {...register('selectedDescription', { required: true })}
        helperText={!!errors.selectedDescription && t('Error.ErrorComp')}
        error={!!errors.selectedDescription}
      />
      <Title title={t('Register.Steps.Step5.Title2')} description={t('Register.Steps.Step5.Desc2')} />
      <SelectInput
        label={t('Register.Steps.Step5.Label2')}
        name='selectorSex'
        items={sex}
        register={register}
        errors={errors}
        icon={<SentimentSatisfiedIcon />}
        watch={watch}
      />
    </>
  )
}
