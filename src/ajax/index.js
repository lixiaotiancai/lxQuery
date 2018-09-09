import fetch from './fetch'
import fetchJsonp from './fetchJsonp'
import iframe from './iframe'

export default {
  ...fetch,
  ...fetchJsonp,
  ...iframe
}
