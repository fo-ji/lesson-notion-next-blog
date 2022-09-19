import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import NotionBlocks from 'notion-block-renderer'

import Layout from '../../components/Layout'
import ArticleMeta from '../../components/ArticleMeta'
import { ArticleProps, Params } from '../../types/types'
import { fetchBlocksByPageId, fetchPages } from '../../utils/notion'
import { getText } from '../../utils/property'
import Block from '../../components/Block'

// MEMO: getStaticProps && Dynamic Root を採用する場合は予め存在するパス（今回はslug）を伝える必要がある
export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await fetchPages({})
  const paths = results.map((page: any) => {
    return {
      params: {
        slug: getText(page.properties.slug.rich_text),
      },
    }
  })

  console.log({ paths })

  return {
    paths,
    fallback: 'blocking', // MEMO: データの取得待ってからレンダリングする
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as Params

  const { results } = await fetchPages({ slug })
  const page = results[0]
  const pageId = page.id
  const { results: blocks } = await fetchBlocksByPageId(pageId)

  // MEMO: ページ情報と記事の中身は別々で取得することになる

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 10,
  }
}

const Article: NextPage<ArticleProps> = ({ page, blocks }) => {
  return (
    <Layout>
      <article className="w-full">
        {/* meta section */}
        <div className="my-12">
          <ArticleMeta page={page} />
        </div>

        {/* article */}
        {/* <div className="my-12">
          {blocks.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div> */}
        <div className="my-12">
          <NotionBlocks blocks={blocks} isCodeHighlighter />
        </div>
      </article>
    </Layout>
  )
}

export default Article
