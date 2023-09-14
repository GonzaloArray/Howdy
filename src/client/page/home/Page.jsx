import React, { useState } from 'react'
import { styled } from 'styled-components'
import { Button, Modal, Rating } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
  neutral,
  neutral10,
  primary,
  primary120,
  primary20,
  primary25,
  secondary120
} from '../../../common/variables'

import { ContainerGeneral } from '../../../common/style/container/ContainerGeneral'

import whatisbgm from './img/bgimg2.png'
import whatisbgd from './img/bgimg.png'
import chat from './img/chat-img.svg'
import translate from './img/translate-img.svg'
import group from './img/group-img.svg'
import academic from './img/academic-img.svg'
import receipt from './img/receipt-img.svg'
import logo from './img/logo-img.svg'
import bookmark from './img/bookmark-img.svg'
import google from './img/google.png'
import { Link } from 'react-router-dom'
import { ModalLogin } from '../../../auth/components/ModalLogin'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../../auth/hook/useAuth'
import Paso1 from '../../../assets/paso1.png'
import Paso2 from '../../../assets/paso2.png'
import Paso3 from '../../../assets/paso3.png'
import Paso4 from '../../../assets/paso4.png'
import Paso5 from '../../../assets/paso5.png'

const Header = styled.header`
  background: linear-gradient(to right, ${primary} 1%, ${secondary120});
  color: var(--white-opacity-100, #fff);
  display: flex;
  padding: 40px 16px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const H1 = styled.h1`
  color: var(--white-opacity-100, #fff);
  font-size: 24px;
  font-style: normal;
  font-family: "Nunito Sans";
  font-weight: 700;
  line-height: 32px;
  font-weight: bold;
`

const H2 = styled.h2`
  color: var(--white-opacity-100, #fff);
  text-align: center;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  max-width: 450px;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 16px;
`

const CustomButtonPri = styled(Button)`
  && {
    background-color: white;
    color: ${primary};
    border: 1px solid ${primary};

    &:hover {
      background-color: ${primary};
      color: white;
    }
  }
`
const CustomButtonSec = styled(Button)`
  && {
    background-color: ${primary};

    &:hover {
      background-color: white;
      color: ${primary};
    }
  }
`

const Container = styled.div`
  height: 433px;
  width: 100%;
  background-image: url(${whatisbgm});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (min-width: 768px) {
    background-image: url(${whatisbgd});
  }
`

const LayoutWhite = styled.div`
  display: inline-flex;
  padding: 24px 16px;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  background: #fcfcfca2;
  margin: auto;
  border-radius: 8px;

  div {
    width: 90%;
    max-width: 450px;
  }
`

const Title = styled.h3`
  font-size: 24px;
  color: #050505;
  font-weight: bold;
  text-align: center;
  padding: 10px;
`

const Subtitle = styled.h4`
  font-size: 18px;
  color: #050505;
  font-family: Roboto;
  text-align: center;
  overflow-wrap: break-word;
`

const BoxWhyChoose = styled.section`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 24px 16px;
  justify-content: center;
  align-items: stretch;
  gap: 16px;
  background: ${secondary120};
`

const WhyChoose = styled.div`
  flex: 1 1 173px;
  display: flex;
  width: 173px;
  padding: 8px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  border-radius: 8px;
  background: #f5f8ec;
  color: #050505;
  font-family: Roboto;
  font-style: normal;
  line-height: 24px;

  div {
    border-radius: 100%;
    width: 30px;
    height: 30px;
    background-color: ${secondary120};
    display: grid;
    place-items: center;

    @media (min-width: 768px) {
      width: 70px;
      height: 70px;
    }
  }
`

const IconsImg = styled.img`
  width: 16px;
  height: 16px;
  filter: invert();

  @media (min-width: 768px) {
    width: 37px;
    height: 37px;
  }
`

const LogoImg = styled.img`
  width: 16px;
  height: 16px;

  @media (min-width: 768px) {
    width: 37px;
    height: 37px;
  }
`

const LayoutLang = styled.section`
  height: max-content;
  width: 100%;
  background: ${primary20};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const BoxLang = styled.div`
  display: flex;
  padding: 24px 16px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    justify-content: center;
  }
`
const CustomButtonLang = styled(Button)`
  && {
    background-color: #ffffff;
    color: ${primary};
    border-radius: 100px;
    box-shadow: none;
    cursor: inherit;

    &:hover {
      color: ${primary};
      background-color: #ffffff;
      box-shadow: none;
      cursor: inherit;
    }
  }
`

const LayoutHowDoes = styled.section`
  height: max-content;
  background-color: ${neutral10};
`

const BoxHowDoes = styled.div`
  padding: 24px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
`

const HowDoes = styled.div`
  flex-basis: calc(33.33% - 16px);
  width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  p {
    width: 360px;
    padding: 0 16px;
    word-wrap: break-word;
  }
`

const ImgHowDoes = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  width: 360px;
  height: 200px;
  background-color: ${primary25};
  border-radius: 8px;
`

const LayoutReviews = styled.section`
  display: flex;
  justify-content: center;
  padding: 40px;
  background-color: ${neutral};

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`

const GoogleReviews = styled.div`
  display: flex;
  gap: 24px;
`

const StarReviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  p {
    background-color: ${primary20};
    border-radius: 40px;
    padding: 0 10px;
    width: 70px;
    font-family: "Noto Sans";
    font-weight: 700;
    line-height: 18px;
  }
`

const WidthLogin = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translate(-50%, 0%);
  border: 2px solid #000;
  padding: 4;
  width: 500px;
  margin-top: 4rem;
  height: auto;
  background-color: white;
  padding: 3rem;
`

export const Page = () => {
  const { t } = useTranslation()

  const { userLogin } = useAuth()

  const [modal, setModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({ mode: 'all' })

  const eventSubmit = (data) => {
    userLogin(data)
  }

  return (
    <ContainerGeneral>
      <Header>
        <H1>{t('Home.Header.Title')}</H1>

        <H2>{t('Home.Header.Subtitle')}</H2>

        <ButtonContainer>
          <CustomButtonPri
            component={Link}
            to='/auth/register'
            variant='contained'
          >
            {t('Home.Header.Button.Register')}
          </CustomButtonPri>
          <CustomButtonSec onClick={() => setModal(true)} variant='contained'>
            {t('Home.Header.Button.Login')}
          </CustomButtonSec>
        </ButtonContainer>
      </Header>
      <Container>
        <LayoutWhite>
          <div>
            <Title>{t('Home.Main.WhatIs.Title')}</Title>
            <Subtitle>{t('Home.Main.WhatIs.Subtitle')}</Subtitle>
          </div>
        </LayoutWhite>
      </Container>
      <Title>{t('Home.Main.WhyChoose.Title')}</Title>
      <BoxWhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={chat} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose1')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={translate} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose2')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={group} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose3')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={academic} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose4')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={receipt} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose5')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <LogoImg src={logo} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose6')}</p>
        </WhyChoose>
        <WhyChoose>
          <div>
            <IconsImg src={bookmark} alt='' />
          </div>
          <p>{t('Home.Main.WhyChoose.Choose7')}</p>
        </WhyChoose>
      </BoxWhyChoose>
      <LayoutLang>
        <Title
          style={{
            borderBottom: `1px solid ${primary}`,
            width: '100%'
          }}
        >
          {t('Home.Main.LangAvailable.Title')}
        </Title>
        <BoxLang>
          <ul>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang1')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang2')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang3')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang4')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang5')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang6')}</CustomButtonLang>
            <CustomButtonLang variant='contained'>{t('Home.Main.LangAvailable.Lang7')}</CustomButtonLang>
          </ul>
        </BoxLang>
      </LayoutLang>
      <LayoutHowDoes>
        <Title
          style={{
            borderBottom: `1px solid ${secondary120}`,
            width: '100%'
          }}
        >
          {t('Home.Main.HowDoes.Title')}
        </Title>
        <BoxHowDoes>
          <HowDoes>
            <ImgHowDoes>
              <CustomButtonSec
                component={Link}
                to='auth/register'
                variant='contained'
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px'
                }}
              >
                {t('Login.Button.Register')}
              </CustomButtonSec>
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step1')}</p>
          </HowDoes>
          <HowDoes>
            <ImgHowDoes>
              <img src={Paso1} alt='' />
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step2')}</p>
          </HowDoes>
          <HowDoes>
            <ImgHowDoes>
              <img src={Paso2} alt='' />
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step3')}</p>
          </HowDoes>
          <HowDoes>
            <ImgHowDoes>
              <img src={Paso3} alt='' />
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step4')}</p>
          </HowDoes>
          <HowDoes>
            <ImgHowDoes>
              <img src={Paso4} alt='' />
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step5')}</p>
          </HowDoes>
          <HowDoes>
            <ImgHowDoes>
              <img src={Paso5} alt='' />
            </ImgHowDoes>
            <p>{t('Home.Main.HowDoes.Step6')}</p>
          </HowDoes>
        </BoxHowDoes>
      </LayoutHowDoes>
      <LayoutReviews>
        <GoogleReviews>
          <img src={google} alt='' />
          <StarReviews>
            <Rating
              name='read-only'
              sx={{ color: primary120 }}
              value={5}
              readOnly
            />
            <p>19201+</p>
          </StarReviews>
        </GoogleReviews>
      </LayoutReviews>

      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <WidthLogin>
            <ModalLogin
              register={register}
              submit={handleSubmit}
              errors={errors}
              event={eventSubmit}
              isValid={isValid}
            />
          </WidthLogin>
        </Modal>

      )}
    </ContainerGeneral>
  )
}
