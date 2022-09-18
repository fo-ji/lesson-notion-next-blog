import { PageType, RichTextType } from '../types/types'

export const getText = (richTexts: RichTextType[]) => {
  try {
    const texts = richTexts.map((richText) => richText.plain_text)
    return texts.join('')
  } catch (err) {
    console.log({ err })
  }
  return ''
}

export const getCover = (cover: PageType['cover']) => {
  if (cover && cover.file) return cover.file.url
  if (cover && cover.external) return cover.external.url
  return '/noimage.png'
}

export const getDate = (date: { start: string }) => {
  try {
    return date.start
  } catch (err) {
    console.log({ err })
  }
  return '-'
}

export const getMultiSelect = (multiSelects: [{ name: string }]) => {
  try {
    return multiSelects.map((tag) => tag.name)
  } catch (err) {
    console.log({ err })
  }
  return []
}
