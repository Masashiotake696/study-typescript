import { axiosInstance } from './api'
import { Health } from '../types/api'

const element = document.getElementById('ping')
if (element) {
  element.addEventListener('click', () => {
    axiosInstance.get<Health>('/api/health').then(({ data }) => { // var data: Health
      console.log(data.message) // (property) Health.message: string
    })
  })
}