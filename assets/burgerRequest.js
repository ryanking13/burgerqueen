import fetch, { Headers } from 'node-fetch'
const crypto = require('crypto')

const headers = {
  Referer: 'https://deliveryapp.co.kr'
}

const wrapCORS = (url) => {
  return 'https://cors.io/?' + url
}

const wrapCORS2 = (url) => {
  return 'https://cors-anywhere.herokuapp.com/' + url
}

const formatParams = (params) => {
  return  Object.keys(params)
            .map(k => k + '=' + params[k])
            .join('&')
}

export const generateUDID = () => {
  const rd = crypto.createHash('sha256').update(Math.random().toString()).digest('hex')
  const udid = [
    'ffffffff',
    rd.slice(0, 4),
    rd.slice(4, 8),
    'ffff',
    'ffff' + rd.slice(8, 16)
  ].join('-')

  return udid;
};

export const getCouponList = (udid) => {
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

export const getCouponCode = (udid, couponPk) => {
  const baseUrl = 'https://deliveryapp.co.kr/app/coupon/getCouponPinData.do?'
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