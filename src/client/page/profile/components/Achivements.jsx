import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import AchivementBadge from './AchivementBadge'

/* import ai from '../img/AI.svg' */
import chat from '../img/chat.svg'
import corrections from '../img/corrections.svg'
import friends from '../img/friends.svg'
import posts from '../img/posts.svg'
/* import rate from '../img/rate.svg'
import recommend from '../img/recommend.svg' */
import trad from '../img/trad.svg'
import usage from '../img/usage.svg'
import { useTranslation } from 'react-i18next'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../../service/firebase'

const AchivementsStyled = styled.section`

    background-color: white;

    width: 100%;

    scroll-margin-bottom: 100px;

    
    .outer-div{
      border: 0.25px solid #A2CD37;
      border-radius: 5px;
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .achivements-list{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;

      gap: 1rem;
    }

    h2{
        font-weight: bold;
        margin-bottom: 1.5rem;
    }

    @media screen and (min-width: 768px){
      padding: 1rem 0;

      .achivements-list{
        flex-direction: column;
      }
    }

`

export const Achivements = ({ auth }) => {
  const { t } = useTranslation()

  const [achivement, setAchivement] = useState(null)

  useEffect(() => {
    const handleAchivements = async () => {
      const docRef = doc(db, 'achievments', auth.user.uid)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    }
    const fetchData = async () => {
      const achivements = await handleAchivements()
      setAchivement(achivements)
    }
    fetchData()
  }, [])

  const data = [
    {
      img: usage,
      label: 'Profile.Achievements.Achievement1',
      num: achivement?.days ?? 0
    },
    {
      img: corrections,
      label: 'Profile.Achievements.Achievement2',
      num: achivement?.corrections ?? 0
    },
    {
      img: friends,
      label: 'Profile.Achievements.Achievement3',
      num: achivement?.friends ?? 0
    },
    /* {
      img: ai,
      label: 'Usó Howdy AI',
      num: ''
    }, */
    {
      img: posts,
      label: 'Profile.Achievements.Achievement4',
      num: achivement?.posts ?? 0
    },
    /* {
      img: rate,
      label: 'Calificó amigos',
      num: ''
    }, */
    /* {
      img: recommend,
      label: 'Recomendó Howdy',
      num: ''
    }, */
    {
      img: trad,
      label: 'Profile.Achievements.Achievement5',
      num: achivement?.translates ?? 0
    },
    {
      img: chat,
      label: 'Profile.Achievements.Achievement6',
      num: achivement?.chats ?? 0
    }
  ]
  return (
    <AchivementsStyled data={data}>
      <div className='outer-div'>
        <h2>{t('Profile.Achievements.Title')}</h2>
        <div className='achivements-list'>
          {
            data.map((datos, i) => {
              return <AchivementBadge key={i} label={t(datos?.label)} img={datos?.img} info={data} num={datos?.num} />
            })
          }
        </div>
      </div>
    </AchivementsStyled>
  )
}
