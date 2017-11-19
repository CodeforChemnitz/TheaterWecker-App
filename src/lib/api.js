import React, { Component } from 'react'
import settings from '../settings.js'

// Network fetch: https://facebook.github.io/react-native/releases/next/docs/network.html

// -- Theaterwecker Backend --
// Django Systemverwaltung: https://theaterwecker.de/admin/
// local self documented API: http://127.0.0.1:8000/api/

const url = settings.url

const api = {
  /**
   * Test: curl https://theaterwecker.de/api/categories/
   * 
   * @param {*} success
   * @param {*} error
   * @return Promise
   */
  getCategories() {
    // console.log("getCategories func call")
    return getJson('categories')
      .then((cat) => {
        // console.log("getCategories then", cat)
        if (cat !== false) {
          // console.log("getCategories success", cat)
          return Promise.resolve(cat)
        } else {
          return Promise.reject("keine Kategorien gefunden")
        }
      })
  },

  /**
   * Ermittelt den Verifizierungs-Status eines Gerätes
   * 
   * Status 200: Device gibts schon, Verify-Status als JSON-Response
   * Status 201: Device gabs noch nicht, Response ist leer
   * Status 400: UUID falsches Format oder sonstwas kaputt
   * 
   * Test: curl -X POST -d 'c732c64a-9409-4af3-b0dc-1ff93e084b5b' https://theaterwecker.de/api/device/
   * 
   * @param {*} success 
   * @param {*} error 
   */
  checkDevice(uuid) {
    return post('device', uuid) // Promise
      .then((response) => { 
        console.log("registerDevice response:", response)
        if (!response) {
          return Promise.reject('registerDevice fehlgeschlagen')
        }
        if (response.status === 200) {
          return response.json() // Promise
        } else if (response.status === 201) {
          return Promise.resolve(false)  // fulfil, Gerät neu
        } else {
          return Promise.reject('registerDevice fehlgeschlagen')
        }
      })
  },

  /**
   * Bestätigt ein Gerät zum Backend mit Verify-Code aus Push
   * 
   * Status 200: alles okay
   * Status 400: alles kaputt
   * 
   * @param {*} key
   * @return Promise
   */
  verifyDevice(key) {
    return get('verify/' + key)
      .then((response) => {
        console.log("verifyDevice response", response)
        if (response.status == 200) {
          return Promise.resolve(true)
        } else {
          return Promise.reject('verifyDevice fehlgeschlagen')
        }
      })
  },

  /**
   * Kategorien abonnieren
   * 
   * Status 201: Speichern erfolgreich
   * Status 404: Device unbekannt
   * Status 412: Device nicht verifiziert
   * Status 500: Speichern fehlgeschlagen
   * 
   * @param {*} uuid
   * @param {*} categories
   * @return Promise
   */
  subscribe(uuid, categories) {
    return post('subscribe', JSON.stringify({
          deviceId: uuid,
          categories
      }))
      .then((response) => {
        console.log("subscribe response", response)
        if (response.status === 201) {
          return Promise.resolve(true)
        } else {
          return Promise.reject('subscribe fehlgeschlagen')
        }
      })
  },

  /**
   * Abonnierte Kategorien holen
   * 
   * @param {*} uuid
   * @return Promise
   */
  getSubscriptions(uuid) {
    return getJson('subscriptions/' + uuid)
  }
}


function get(route) {
  console.log("GET " + url + '/' + route)
  return fetch(url + '/' + route)
}

function getJson(route) {
  return get(route)
    .then((response) => { 
      console.log("getJson",route,"response",response)
      return response.json()
    })
}

function post(route, body) {
  console.log("POST " + url + '/' + route, body)
  return fetch(url + '/' + route, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body
    })
}

export default api
