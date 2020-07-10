import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create(({
  baseURL: 'http://localhost:8000/'
}))

Vue.prototype.$axios = axiosInstance
