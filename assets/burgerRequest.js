import fetch, { Headers } from 'node-fetch'
const crypto = require('crypto')

// const baseUrl = "https://app.burgerking.co.kr" // sometimes fails with cloudflare proxy
const baseUrl = "http://ec2-13-209-180-127.ap-northeast-2.compute.amazonaws.com"
const corsBaseUrl = "https://cors.ryanking13.workers.dev"

const headers = {
  'Host': 'app.burgerking.co.kr:443',
  'User-Agent': 'Mozilla/5.0 (Linux; Android 4.4.2; Nexus 4 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.114 Mobile Safari/537.36',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const encode = (data) => {
  return Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&')
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

  return udid
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
  const apiUrl = `${baseUrl}/bkr-omni/BKR4001.json`
  const corsParams = {
    u: apiUrl,
    host: headers.Host,
  }
  const corsUrl = `${corsBaseUrl}/?${encode(corsParams)}`

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

  return fetch(corsUrl, {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: encode(data),
  })
    .then(res => res.json())
    .then(json => json.body.couponList)
    .catch(() => "ERROR")
}

// export const getCouponCode = (udid, couponPk) => {
//   const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/couponcode?'
//   const params = {
//     udid,
//     couponpk: couponPk,
//   }

//   const url = apiUrl + formatParams(params)

//   return fetch(url)
//     .then(res => res.json())
// }

export const getCouponCode = (udid, couponPk) => {
  const apiUrl = `${baseUrl}/bkr-omni/BKR4003.json`
  const corsParams = {
    u: apiUrl,
    host: headers.Host,
  }
  const corsUrl = `${corsBaseUrl}/?${encode(corsParams)}`

  const params = {
    header: {
      result: 'true',
      trcode: 'BKR4003',
      platform: '01',
      is_cryption: 'false',
    },
    body: {
      cd_coupon: couponPk,
      no_pin: 'null',
      fg_app: 'Y',
      udid: udid,
    }
  }

  const data = {
    message: encodeURIComponent(JSON.stringify(params)),
  }

  return fetch(corsUrl, {
    method: 'POST',
    mode: 'cors',
    headers: headers,
    body: encode(data),
  })
    .then(res => res.json())
    .then(json => json.body.result_data)
    .catch(() => "ERROR")
}

export const getSurveyCode = (code) => {
  const apiUrl = 'https://burgerqueen-api.azurewebsites.net/api/surveycode?'
  const params = {
    code,
  }

  const url = apiUrl + encode(params)

  return fetch(url)
    .then(res => {
      if (!res.ok) return { 'failMessage': res.text() }
      return res.json()
    })
    .catch(() => {
      return { 'failMessage': 'Undefined Error' }
    })
}
