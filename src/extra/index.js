import query from './query'
import getAbsoluteUrl from './getAbsoluteUrl'
import debounce from './debounce'
import throttle from './throttle'
import sleep from './sleep'
import cookie from './cookie'
import localStorage from './localStorage'
import sessionStorage from './sessionStorage'
import formatDate from './formatDate'
import xss from './xss'

export default {
  ...query,
  ...getAbsoluteUrl,
  ...debounce,
  ...throttle,
  ...sleep,
  ...cookie,
  ...localStorage,
  ...sessionStorage,
  ...formatDate,
  ...xss
}
