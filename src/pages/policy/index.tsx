import React from 'react'
import Head from 'next/head'
import Policy from '@/components/home/Policy'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta
          name="description"
          content="Privacy Policy of Our Chrome Extension"
        />
      </Head>

      <Policy />
    </>
  )
}
