import { useEffect } from 'react'

import Header from '../components/Header'
import { useEthers } from '@usedapp/core'

const Create = () => {
  const { activateBrowserWallet } = useEthers()

  useEffect(() => {
    activateBrowserWallet()
  }, [activateBrowserWallet])

  return (
    <>
      <Header />
    </>
  )
}

export default Create
