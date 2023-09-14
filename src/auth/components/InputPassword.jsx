import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel
} from '@mui/material'
import React, { useState } from 'react'

export const InputPassword = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <FormControl fullWidth variant='standard' margin='normal'>
      <InputLabel error={!!errors.password} color='secondary' htmlFor='standard-adornment-password'>Contraseña</InputLabel>
      <Input
        color='secondary'
        id='standard-adornment-password'
        type={showPassword ? 'text' : 'password'}
        autoComplete='current-password'
        {...register('password', { required: true })}
        error={!!errors.password}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors.password && (
        <FormHelperText error>Este campo es requerido</FormHelperText>
      )}
    </FormControl>
  )
}
