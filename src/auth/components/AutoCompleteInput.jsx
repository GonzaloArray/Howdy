import { Autocomplete, Box, FormControl, FormHelperText, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const AutoCompleteInput = ({
  label,
  items = [],
  name,
  register,
  errors,
  icon,
  onEvent,
  setValue,
  watch
}) => {
  const { t } = useTranslation()

  const [adorn, setAdorn] = useState(false)
  const [country, setCountry] = useState(null)

  const handleFocus = () => {
    setAdorn(true)
    onEvent()
  }

  useEffect(() => {
    const result = watch(name)
    setCountry({
      value: result?.toLowerCase() ?? '',
      title: result ?? ''
    })
  }, [])

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <Autocomplete
        id={name}
        options={items ?? []}
        value={country}
        onChange={(event, newValue) => {
          const resolveCountry = newValue ? newValue.title : null
          const data = resolveCountry
            ? items?.find((option) => {
              return resolveCountry === option?.title
            }) ?? null
            : null
          setValue(name, resolveCountry, { shouldValidate: true })
          setCountry(data)
        }}
        autoHighlight
        getOptionLabel={(option) => option.title}
        isOptionEqualToValue={(option, value) =>
          option?.title === value?.title}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            color='secondary'
            name={name}
            onFocus={handleFocus}
            onBlur={() => setAdorn(false)}
            {...register(name, { required: true })}
            InputProps={{
              ...params.InputProps,
              startAdornment: adorn ? <Box position='start'>{icon}</Box> : null
            }}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText error>{t('Error.ErrorReq')}</FormHelperText>
      )}
    </FormControl>
  )
}
