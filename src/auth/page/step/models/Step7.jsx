import React from 'react'
import { Title } from '../../../components/Title'
import { SelectedInterest } from '../../../components/SelectedInterest'
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import { useTranslation } from 'react-i18next'

export const Step7 = ({ register, errors, watch, setValue }) => {
  const { t } = useTranslation()

  const levelOfKnowledge = [
    {
      value: 'cantar',
      title: 'Register.Steps.Step7.Interest.Interest1',
      id: crypto.randomUUID()
    },
    {
      value: 'bailar',
      title: 'Register.Steps.Step7.Interest.Interest2',
      id: crypto.randomUUID()
    },
    {
      value: 'aprender',
      title: 'Register.Steps.Step7.Interest.Interest3',
      id: crypto.randomUUID()
    },
    {
      value: 'reir',
      title: 'Register.Steps.Step7.Interest.Interest4',
      id: crypto.randomUUID()
    },
    {
      value: 'compartir',
      title: 'Register.Steps.Step7.Interest.Interest5',
      id: crypto.randomUUID()
    }
  ]
  return (
    <>
      <Title
        title={t('Register.Steps.Step7.Title')}
        description={t('Register.Steps.Step7.Desc')}
      />
      <SelectedInterest
        register={register}
        label={t('Register.Steps.Step7.Interest.Label')}
        errors={errors}
        icon={<ControlPointIcon />}
        name='selectedInterest'
        watch={watch}
        setValue={setValue}
        items={levelOfKnowledge}
      />
    </>
  )
}
