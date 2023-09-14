import React, { useState, useCallback } from 'react'
import PublicIcon from '@mui/icons-material/Public'
import { Title } from '../../../components/Title'
import { AutoCompleteInput } from '../../../components/AutoCompleteInput'
import { fetchCountryName } from '../../../../../api/country-api'
import { useTranslation } from 'react-i18next'

export const Step1 = ({ register, unregister, setValue, errors, watch }) => {
  const { t } = useTranslation()

  const [data, setData] = useState([])

  const handleCountry = useCallback(async () => {
    setData(null)
    const country = await fetchCountryName()
    setData(country)
  }, [])

  return (
    <>
      <Title title={t('Register.Steps.Step1.Title')} description={t('Register.Steps.Step1.Desc')} />

      <AutoCompleteInput
        label={t('Register.Steps.Step1.Label')}
        name='selectorCountry'
        items={data}
        register={register}
        errors={errors}
        onEvent={handleCountry}
        icon={<PublicIcon />}
        watch={watch}
        setValue={setValue}
      />
    </>
  )
}
