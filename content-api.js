import { createClient } from "contentful";

const SPACE = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE;
const TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_TOKEN;

const client = createClient({
  space: SPACE,
  accessToken: TOKEN
});

const getEntityByField = async (type, field, value) => {
  try {
    const entries = await client.getEntries({
      content_type: type,
      [`fields.${field}`]: value,
      include: 5
    });
    return entries.items[0];
  } catch (err) {}
};

export const getProject = async id => getEntityByField("project", "id", id);
export const getPage = async title => getEntityByField("page", "title", title);
export const getSection = async hash => getEntityByField("section", "hash", hash);
