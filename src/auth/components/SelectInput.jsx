import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const SelectInput = ({
  label,
  items = [],
  name,
  register,
  errors,
  icon,
  watch
}) => {
  const { t } = useTranslation()

  const [adorn, setAdorn] = useState(false)

  const handleFocus = () => {
    setAdorn(true)
  }

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel color='secondary' id='demo-simple-select-label'>
        {label}
      </InputLabel>
      <Select
        onFocus={handleFocus}
        onBlur={() => setAdorn(false)}
        labelId='demo-simple-select-label'
        id={name}
        name={name}
        label={label}
        value={watch(name) ?? ''}
        color='secondary'
        {...register(name, { required: true })}
        startAdornment={
          adorn
            ? (
              <InputAdornment position='start'>{icon}</InputAdornment>
              )
            : null
        }
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.value.toLowerCase()}>
            {t(item.title)}
          </MenuItem>
        ))}
      </Select>
      {errors[name] && (
        <FormHelperText error>{t('Error.ErrorReq')}</FormHelperText>
      )}
    </FormControl>
  )
}
