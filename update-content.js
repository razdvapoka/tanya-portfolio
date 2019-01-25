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

const types = [
  'section'
]

export const getcontent = async () => {
  console.log('> Starting import...')
  for (const type of types) {
    console.log('> Getting content for', type)
    const entries = await client.getEntries({
      content_type: type,
      include: 3
    })
    fs.writeFileSync(
      path.join(__dirname, 'data', `${type}.json`),
      JSON.stringify(entries)
    )
    console.log('> Content gotten and written for', type)
  }
  return true
}

getcontent()
