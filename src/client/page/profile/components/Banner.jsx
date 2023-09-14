import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import EditIcon from '@mui/icons-material/Edit'
import { Divider } from '@mui/material'
import { useAppSelector } from '../../../../common/store/config'

import { primary, primary120, secondary, secondary120 } from '../../../../common/variables'
import profile from '../../dashboard/img/profile.svg'
import chat from '../img/chat.svg'

import { LangBadge } from './LangBadge'
import { useTranslation } from 'react-i18next'

import { db } from '../../../../service/firebase'
import { getDoc, doc, query, collection, where, getDocs } from 'firebase/firestore'
import { ButtonAddFriend } from '../../dashboard/components/post/ButtonAddFriend'
import { PersonAddAlt1 } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const BannerStyled = styled.header`

  background: linear-gradient(180deg, #FFC0CB 40%, #ffffff 20%);

  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 2rem;

  gap: 1rem;

  color: black;

  .person{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    width: 80%;
  }

  .person-img{
    max-width: 125px;
    
    aspect-ratio: 1/1;
    border-radius: 12px;

    
    img{
      border-radius: 12px;
      width: 100%;
      aspect-ratio: 1/1;
    }
    
  }

  .person-info{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .languages{
    display: flex;
    align-items: center;

    gap: 16px;
  }

  .edit-icon{
    padding: 0.5rem;

    border-radius: 10px;
    background-color: #F5F8EC;

    color: ${primary120};

    width: 32px;
    height: 32px;

    box-shadow: 0px 1px 3px 0px ${primary};
    -webkit-box-shadow: 0px 1px 3px 0px ${primary};
    -moz-box-shadow: 0px 1px 3px 0px ${primary};
  }

  .vertical{
    height: 2.5rem;
  }

  @media screen and (min-width: 768px){

    background: linear-gradient(180deg, #FFC0CB 50%, #ffffff 20%);

    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;

    .person{
      flex-direction: row;
      align-items: flex-end;

      gap: 2rem;
    }

    .person-info{
      align-items: flex-start;
    }

    .person-img{
      max-width: 200px;
    }
  }

  .native{
    background-color: #F5F8EC !important;
    border: 1px solid ${secondary120} !important;
  }

  .foraign{
    background-color: #F6E7F1 !important;
    border: 1px solid ${primary120} !important;
  }

  .interact{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.90625rem 1rem;
    border-radius: 0.25rem;
    background: ${primary};
    box-shadow: 0px 1px 3px 0px rgba(195, 43, 143, 0.30), 0px 4px 8px 0px rgba(195, 43, 143, 0.15);
    color: white;
    transition: all ease-in-out 0.1s;
    cursor: pointer;

    img{
      filter: brightness(0) saturate(100%) invert(100%);
    }
  
    &:hover{
      background-color: ${secondary120};
      transition: all ease-in-out 0.1s;
      box-shadow: 0px 1px 3px 0px ${secondary}, 0px 4px 8px 0px ${secondary120};
    }

  }
  .pending{
    text-align: center;
    padding: 0.90625rem 1rem;
    background-color: gray;
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg{
      filter: brightness(0) saturate(100%) opacity(50%);
    }

  }

  @media screen and (min-width: 1024px){
    .edit-icon{
      width: 36px;
      height: 36px;

      border-radius: 12px;
    }

    .person{
      gap: 4rem;
    }

    .person-img{
      max-width: 325px;
    }
  }
`

const Banner = ({ data, id }) => {
  const [user, setUser] = useState(null)
  const [friends, setFriends] = useState([])

  useEffect(() => {
    const handleGetData = async () => {
      const docRef = doc(db, 'users', id)
      const docSnap = await getDoc(docRef)
      return docSnap.data()
    }

    const handleFriends = async () => {
      const q = query(collection(db, 'friendRequests'), (where('sender', '==', auth.user.uid), where('receiver', '==', id) || where('sender', '==', id), where('receiver', '==', auth.user.uid)))
      const querySnapshot = await getDocs(q)
      const f = []
      querySnapshot.forEach((doc) =>
        f.push(doc.data())
      )
      return f
    }

    const fetchData = async () => {
      const user = await handleGetData()
      const friendReq = await handleFriends()
      setUser(user)
      setFriends(friendReq)
    }

    fetchData()
    handleFriends()
  }, [id])

  const { t } = useTranslation()

  const auth = useAppSelector((state) => state.auth.user)

  return (
    <BannerStyled>

      <div className='person'>

        <div className='person-img'>
          <img src={user?.photo ? user?.photo : profile} alt={user?.name} />
        </div>
        <div className='person-info'>
          {user?.name ? user?.name : 'John Doe'}
          <div className='languages'>
            <LangBadge label={t(data?.selectorLan.title)} variante='native' avatar={data?.selectorLan.photo} />
            <Divider orientation='vertical' variant='middle' className='vertical' />
            <LangBadge label={data?.selectorLanguage.title} variante='foraign' avatar={data?.selectorLanguage.photo} />
          </div>
        </div>
      </div>

      {
        auth.user.uid === id
          ? <div>
            <EditIcon className='edit-icon' />
          </div>
          : (friends[0]?.status === 'accepted' ? <Link to={`/client/dashboard/chats/${id}${auth.user.uid}`} className='interact'><img src={chat} /></Link> : (friends[0]?.status === 'pending' ? <div className='pending'><PersonAddAlt1 /></div> : <ButtonAddFriend idUser={id} currentUserUid={auth.user.uid} />))
      }

    </BannerStyled>
  )
}

export default Banner
