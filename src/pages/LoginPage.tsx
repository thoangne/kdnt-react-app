import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import LoginForm from '../components/LoginForm'
import { SupportCard } from '../components/Card/SupportCard'

export const LoginPage = () => {
  return (
    <>
        <Header></Header>
        <LoginForm></LoginForm>
        <SupportCard></SupportCard>
        <Footer></Footer>
    </>
  )
}
