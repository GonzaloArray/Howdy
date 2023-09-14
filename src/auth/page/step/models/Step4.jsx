import { LocalizationProvider } from '@mui/x-date-pickers'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Title } from '../../../components/Title'
import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const Step4 = ({ register, errors, watch, setValue }) => {
  const { t } = useTranslation()

  const [dateUser, setDateUser] = useState(null)

  const validateDate = (date) => {
    const maxDate = dayjs('2007-01-01')
    return date.isAfter(maxDate)
  }

  useEffect(() => {
    register('selectedDate', { required: true })
    if (watch('selectedDate')) {
      const result = dayjs(watch('selectedDate'))
      setValue('selectedDate', result.valueOf(), { shouldValidate: true })
      setDateUser(result)
    }
  }, [])

  return (
    <>
      <Title title={t('Register.Steps.Step4.Title')} description='' />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={t('Register.Steps.Step4.Label')}
          value={dateUser ?? null}
          onChange={(date) => {
            setDateUser(date)
            setValue('selectedDate', date.valueOf(), { shouldValidate: true })
          }}
          shouldDisableDate={validateDate}
        >
          {(params) => (
            <TextField
              {...params}
              error={!!errors.selectedDate}
              helperText={errors.selectedDate && errors.selectedDate.message}
              fullWidth
            />
          )}
        </DatePicker>
      </LocalizationProvider>
    </>
  )
}
