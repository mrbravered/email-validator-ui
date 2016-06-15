import readFile from 'utils/listReader'
import unique from 'lodash/uniq'
import compact from 'lodash/compact'

export const parse = (file) => readFile(file).then((text) => {
  return compact(unique(text.trim().split('\n')))
})
