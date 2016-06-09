import readFile from 'utils/listReader'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'

export const parse = (file) => readFile(file).then((text) => {
  const trimmed = text.trim()
  const emailsArray = compact(unique(trimmed.split('\n')))
  return {
    list: emailsArray,
    ready: true
  }
})
