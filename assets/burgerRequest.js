import fetch, { Headers } from 'node-fetch'
const crypto = require('crypto')

const headers = {
  'Host': 'app.burgerking.co.kr:443',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const wrapCORS = (url) => {
  return 'https://cors.io/?' + url
}

const wrapCORS2 = (url) => {
  return 'https://cors-anywhere.herokuapp.com/' + url
}

const formatParams = (params) => {
  return Object.keys(params)
    .map(k => k + '=' + params[k])
    .join('&')
}

export const generateUDID = () => {
  const rd = crypto.createHash('sha512').update(Math.random().toString()).digest('hex')
  // const udid = [
  //   'ffffffff',
  //   rd.slice(0, 4),
  //   rd.slice(4, 8),
  //   'ffff',
  //   'ffff' + rd.slice(8, 16)
  // ].join('-')
  const udid = 'andn_' + rd

  return udid;
};

export const getCouponListCORS = (udid) => {
  const baseUrl = 'https://deliveryapp.co.kr/app/coupon/getCouponList.do?'
  const params = {
    udid,
    appVersion: '3.0.9',
    channel: '2',
    delKingSe: '3',
  }

  const url = wrapCORS(baseUrl + formatParams(params))
  const urlAlt = wrapCORS2(baseUrl + formatParams(params))
  return fetch(url, { headers: headers })
    .then(res => res.json())
    .then(json => json.resultlist)
    .catch(() => {
      return fetch(urlAlt, { headers: headers })
        .then(res => res.json())
        .then(json => json.resultlist)
    })
}

// export const getCouponList = (udid) => {
//   const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/couponlist?'
//   const params = {
//     udid,
//   }

//   const url = apiUrl + formatParams(params)

//   return fetch(url)
//     .then(res => res.json())
//     .catch(() => {
//       return getCouponListCORS(udid)
//     })
// }

export const getCouponList = (udid) => {
  const baseUrl = 'https://app.burgerking.co.kr/bkr-omni/BKR4001.json'
  const apiUrl = 'https://cors.ryanking13.workers.dev/?u=' + baseUrl + '&host=' + headers.Host

  const params = {
    header: {
      result: 'true',
      trcode: 'BKR4001',
      platform: '01',
      is_cryption: 'false',
    },
    body: {
      cdCouponObj: '3',
      udid: udid,
    }
  }

  const data = {
    message: encodeURIComponent(JSON.stringify(params)),
  }

  const searchParams = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')

  console.log(searchParams)

  return fetch(apiUrl, {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: searchParams,
  })
    .then(res => res.json())
    .then(json => json.body.couponList)
    .catch(() => "ERROR")
}

export const getCouponCodeCORS = (udid, couponPk) => {
  const baseUrl = 'http://ec2-52-79-88-56.ap-northeast-2.compute.amazonaws.com/bkr-omni/BKR4003.json'
  const params = {
    udid,
    couponPk,
    appVersion: '3.0.9',
    channel: '2',
    couponPinPk: '0',
  }

  const url = wrapCORS(baseUrl + formatParams(params))
  const urlAlt = wrapCORS2(baseUrl + formatParams(params))

  return fetch(url)
    .then(res => res.json())
    .then(json => json.resultMap.couponPinData)
    .catch(() => {
      return fetch(urlAlt, { headers: headers })
        .then(res => res.json())
        .then(json => json.resultMap.couponPinData)
    })
}

export const getCouponCode = (udid, couponPk) => {
  const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/couponcode?'
  const params = {
    udid,
    couponpk: couponPk,
  }

  const url = apiUrl + formatParams(params)

  return fetch(url)
    .then(res => res.json())
    .catch(() => {
      return getCouponCodeCORS(udid, couponPk)
    })
}

export const getSurveyCode = (code) => {
  const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/surveycode?'
  const params = {
    code,
  }

  const url = apiUrl + formatParams(params)

  return fetch(url)
    .then(res => {
      if (!res.ok) return { 'failMessage': res.text() }
      return res.json()
    })
    .catch(() => {
      return { 'failMessage': 'Undefined Error' }
    })
}

export const init = () => {
  const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/couponcode?'
  return fetch(apiUrl)
}
