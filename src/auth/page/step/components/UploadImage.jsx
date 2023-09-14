import { Avatar } from '@mui/material'
import LocalSeeIcon from '@mui/icons-material/LocalSee'
import React, { useEffect, useState } from 'react'
import { ContainerFlexCenter } from '../../../../common/style/container/ContainerFlexCenter'
import { ButtonIcon } from '../../../../common/style/button/ButtonIcon'
import { PositionRelative } from '../../../../common/style/position/PositionRelative'
import { PositionAbsolute } from '../../../../common/style/position/PositionAbsolute'
import { useDropzone } from 'react-dropzone'

export const UploadImage = ({ register, errors, name, setValue, watch }) => {
  const [uploadImage, setUploadImage] = useState('')
  const onDrop = (droppedFiles) => {
    if (droppedFiles && droppedFiles.length > 0) {
      const file = droppedFiles[0]
      const url = URL.createObjectURL(file)
      setUploadImage(url)
      setValue(name, file, { shouldValidate: true })
    }
  }

  const {
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png']
    },
    useFsAccessApi: false,
    multiple: false
  })
  useEffect(() => {
    register(name)
    if (watch(name)) {
      const drop = watch(name)
      const url = URL.createObjectURL(drop)
      setUploadImage(url)
      setValue(name, drop, { shouldValidate: true })
    }
  }, [register, name])

  return (
    <ContainerFlexCenter>
      <PositionRelative>
        <Avatar
          alt='Remy Sharp'
          src={uploadImage !== '' ? uploadImage : ''}
          sx={{ width: 78, height: 78 }}
        />
        <PositionAbsolute>
          <ButtonIcon type='button' {...getRootProps()}>
            <input {...getInputProps()} />
            <LocalSeeIcon sx={{ color: 'black' }} fontSize='small' />
          </ButtonIcon>
        </PositionAbsolute>
      </PositionRelative>
    </ContainerFlexCenter>
  )
}
