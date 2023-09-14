import React, { useState, useEffect } from 'react'
import { SearchContained } from './components/SearchContained'
import { ContainedPost } from '../../../common/style/container/ContainedPost'
import { TitleSeparator } from './components/TitleSeparator'
import { Post } from './models/Post'
import { PublicComment } from './models/PublicComment'
import { ModalPost } from './components/ModalPost'
import { collection, doc, getDoc, onSnapshot, or, query, where } from 'firebase/firestore'
import { db } from '../../../service/firebase'
import { useAppSelector } from '../../../common/store/config'
import { useTranslation } from 'react-i18next'

export const Page = () => {
  const { t } = useTranslation()

  const user = useAppSelector(state => state.auth.user.user)
  const [modal, setModal] = useState(false)
  const [post, setPost] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, 'profile', user.uid)
      const docSnap = await getDoc(docRef)

      const lan = {
        native: '',
        learning: ''
      }

      if (docSnap.exists()) {
        lan.native = docSnap.data().selectorLan.value
        lan.learning = docSnap.data().selectorLanguage.value

        const q = query(
          collection(db, 'comment'),
          or(where('lanNative', '==', lan.learning), where('lanLearning', '==', lan.learning))
        )
        onSnapshot(q, (querySnapshot) => {
          const comments = []
          querySnapshot.forEach((doc) => {
            const commentData = doc.data()
            const commentWithId = { id: doc.id, ...commentData }
            comments.push(commentWithId)
          })
          setPost(() => comments)
        })
      } else {
        console.log('No such document!')
      }
    }

    getData()
  }, [])

  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <ContainedPost>
      <SearchContained />
      <TitleSeparator>{t('HomeLog.Post.Interest')}</TitleSeparator>
      <PublicComment setModal={setModal} />

      {post?.map((e) => (
        <Post
          key={e?.id}
          name={e?.name}
          description={e?.selectComment}
          photo={e?.photo}
          idUser={e?.idUSer}
          idPost={e?.id}
          img={e?.image}
        />
      ))}
      <ModalPost setModal={setModal} open={modal} close={handleCloseModal} />
    </ContainedPost>
  )
}
