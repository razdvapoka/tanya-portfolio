import fs from 'fs'
import path from 'path'
import { createClient } from 'contentful'
require('dotenv').config()

const SPACE = process.env.CONTENTFUL_SPACE
const TOKEN = process.env.CONTENTFUL_TOKEN

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
})

const sections = [
  'main'
]

export const getcontent = async () => {
  console.log('> Starting import...')
  sections.forEach(async section => {
    try {
      const entries = await client.getEntries({
        content_type: 'sections',
        'fields.title': section,
        include: 4
      })
      fs.writeFileSync(
        path.join(__dirname, 'data', `${section}.json`),
        JSON.stringify(entries.items[0])
      )
      console.log('> Content gotten and written for section', section)
    } catch (err) {
      console.error('> Failed to get content for section', section, err)
    }
  })
  return true
}

getcontent()
