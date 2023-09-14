import {
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const SelectedInterest = ({
  register,
  errors,
  icon,
  name,
  label,
  watch,
  setValue,
  items
}) => {
  const { t } = useTranslation()

  const [chipName, setChipName] = useState('')
  const [interests, setInterests] = useState([])

  const handleChangeName = (event) => {
    if (!interests.includes(event.target.value)) {
      setChipName(() => event.target.value)
      setInterests((data) => [...data, { data: event.target.value, id: crypto.randomUUID() }])
      setValue(name, interests)
    }
    setChipName('')
  }
  const handleDelete = (deletedInterest) => {
    const updatedInterests = interests.filter(
      (interest) => interest.id !== deletedInterest
    )
    setInterests(updatedInterests)
    setValue(name, updatedInterests)
  }
  register(name)

  useEffect(() => {
    const result = watch(name) ?? []
    setInterests(() => result)
    setValue(name, result)
  }, [])

  return (
    <Grid container>
      <Grid item xs={12} />
      <FormControl fullWidth error={!!errors[name]}>
        <InputLabel color='secondary' id='demo-simple-select-label'>
          {label}
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id={name}
          name={name}
          value={chipName}
          label={label}
          color='secondary'
          onChange={handleChangeName}
          endAdornment={
            <InputAdornment position='start'>{icon}</InputAdornment>
          }
        >
          {items?.map((item) => (
            <MenuItem key={item.id} value={item.value.toLowerCase()}>
              {t(item.title)}
            </MenuItem>
          ))}
        </Select>
        {errors[name] && (
          <FormHelperText error>Este campo es requerido</FormHelperText>
        )}
      </FormControl>
      <Grid item xs={12} sx={{ display: 'flex', mt: 1 }}>
        <Typography>{interests.length}</Typography>/<Typography>20</Typography>
      </Grid>
      <Grid
        gap={2}
        item
        xs={12}
        sx={{ display: 'flex', mt: 1, flexWrap: 'wrap' }}
      >
        {interests.map((item) => (
          <Chip
            color='secondary'
            key={item.id}
            label={item.data}
            onDelete={() => handleDelete(item.id)}
          />
        ))}
      </Grid>
    </Grid>
  )
}
