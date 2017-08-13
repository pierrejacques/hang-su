import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
const local = 'static/'
const remote = 'http://202.120.43.16:8081/static/bp_data/'

const tryParse = str => {
  let data
  try {
    data = JSON.parse(str)
  } catch (e) {
    data = {}
    throw e
  }
  return data
}

export default {
  getJSON (name) {
    return {
      then (success, fail) {
        Vue.http.get(`${local}JSON/${name}.json`)
        .then(response => {
          success(tryParse(response.bodyText))
        }, response => {
          fail(response)
        })
      }
    }
  },
  getImg (name, handler) {
    const img = new Image()
    let isRemote = true
    const remoteUrl = `${remote}${name}`
    const localUrl = `${local}data/${name}`
    img.onload = () => {
      isRemote ? handler(remoteUrl) : handler(localUrl)
    }
    img.onerror = () => {
      if (isRemote) {
        isRemote = false
        img.src = localUrl
      } else {
        handler(undefined)
      }
    }
    img.src = remoteUrl
  }
}
