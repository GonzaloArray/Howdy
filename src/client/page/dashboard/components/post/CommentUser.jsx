import { InputBase, Paper } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { db } from '../../../../../service/firebase'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAppSelector } from '../../../../../common/store/config'
import { useTranslation } from 'react-i18next'

import addPic from '../../img/add-pic.svg'
import SendIcon from '@mui/icons-material/Send'

import { styled } from 'styled-components'
const FormStyled = styled(Paper)`

  .comments-input{
    padding: 1rem;
  }

  .icons-div{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    
  }

  .icon-comment{
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }
`

export const CommentUser = ({ idPost, setComment }) => {
  const { t } = useTranslation()

  const user = useAppSelector(state => state.auth.user.user)
  const {
    register,
    reset,
    isValid,
    handleSubmit
  } = useForm({
    mode: 'all'
  })

  const onHandle = async (data) => {
    await addDoc(collection(db, 'comments'), {
      idPost,
      idUser: user.uid,
      msg: data.comment,
      name: user.name,
      photo: user.photo,
      createdAt: serverTimestamp()
    })
    reset()
  }

  return (
    <FormStyled component='form' onSubmit={handleSubmit(onHandle)} style={{ display: 'flex', alignItems: 'center', width: '100%', borderRadius: '28px', padding: '0.25rem 1rem', gap: '0.5rem' }} elevation={0} variant='outlined'>

      <InputBase
        fullWidth
        name='comment'
        {...register('comment', { required: true })}
        id='outlined-basic'
        variant='outlined'
        multiline
        placeholder={t('HomeLog.Post.React.Comment')}
        className='comment-input'
        style={{ padding: '0.25rem 0', width: '100%' }}
      />
      <div className='icons-div'>
        <img src={addPic} alt='Add picture' className='icon-comment' />
        <button type='submit' disabled={isValid} variant='contained' className='icon-comment'>
          <SendIcon />
        </button>
      </div>

    </FormStyled>
  )
}
