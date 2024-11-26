import axios from 'axios'

const Api = axios.create({ baseURL: 'http://192.168.121.1:4000/api/', headers: { Authorization: localStorage.getItem('token') } })

export const createProduct = (data) => Api.post('product/create', data, { headers: { "Content-Type": "multipart/form-data" } })
export const getProducts = () => Api.get('product/get')
export const getProductById = (id) => Api.get('product/get/' + id, id)
export const updateProduct = (id, data) => Api.put('product/update/' + id, data)
export const deleteProduct = (id) => Api.delete('product/delete/' + id)




export const registerUser = (data) => Api.post('user/create', data)
export const loginUser = (data) => Api.post('user/login', data)