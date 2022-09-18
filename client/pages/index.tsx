import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import Layout from '../components/Layout'
import Card from '../components/Card'
import { siteConfig } from '../site.config'
import { sampleCards } from '../utils/sample'
import { fetchPages } from '../utils/notion'
import { IndexProps } from '../types/types'

export const getStaticProps: GetStaticProps = async () => {
  const { results } = await fetchPages()
  return {
    props: {
      pages: results ? results : [],
    },
    revalidate: 10, // MEMO: ISR キャッシュの再検証を必要とするまでの秒数を指定
  }
}

const Home: NextPage<IndexProps> = ({ pages }) => {
  console.log({ pages })

  return (
    <Layout>
      <div className="pt-12">
        <h1 className="text-5xl mb-8">{siteConfig.title}</h1>
        <div className="grid md:gap-6 mt-10 md:grid-cols-2 w-full my-12">
          {/* Card */}
          {pages.map((page, index) => (
            <Card key={index} page={page} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Home
