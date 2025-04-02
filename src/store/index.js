import { createApp } from 'vue'
import { createStore, createLogger } from 'vuex'

import axios from '@/helpers/http'

// Create a new store instance.
const store = createStore({
    state() {
        return {
            loading: true,
            itemsPerPage: 10,
            search: '',
            dataItems: [],
            totalItems: 0,
            modal: {
                open: false,
                title: '',
                description: '',
                type: 'alert',
                buttons: []
            },
            cliente: {}
        }
    },
    getters: {
        itemsPerPage: state => state.itemsPerPage,
        dataItems: state => state.dataItems,
        loading: state => state.loading,
        totalItems: state => state.totalItems,
        search: state => state.search,
        modal: state => state.modal,
        cliente: state => state.cliente
    },
    mutations: {
        SET_LOADING: (state, payload) => state.loading = payload,
        SET_SEARCH: (state, payload = '') => state.search = payload,
        SET_DATA_ITEMS: (state, payload = '') => state.dataItems = payload,
        SET_TOTAL_ITEMS: (state, payload) => state.totalItems = payload,
        SET_MODAL: (state, payload) => state.modal = payload,
        SET_CLOSE_MODAL: (state, payload) => state.modal = {
            open: false,
            title: '',
            description: '',
            type: 'alert',
            buttons: []
        },
        SET_CLIENT: (state, payload) => state.cliente = payload

    },
    actions: {
        async listClients({commit}) {

            commit('SET_LOADING', true)

            const result =  await axios.get('/api/client')

            if(result?.data?.status === 'success') {

                console.log(result.data.data)

                commit('SET_DATA_ITEMS', result.data.data)
                commit('SET_TOTAL_ITEMS', result.data.data.lenght)
            }

            commit('SET_LOADING', false)
            
        },
        async addClient({commit}, payload) {

            const result =  await axios.post('/api/client', payload)

            if(result?.data?.status === 'success') {

                return true
            }

            return false
            
        },
        async viewClient({commit}, payload) {

            const result =  await axios.get(`/api/client/${payload}`)

            if(result?.data?.status === 'success') {
                commit('SET_CLIENT', result.data.data)
                return result.data.data
            }

            return null
            
        },
        async editClient({commit}, {id, values}) {

            const result =  await axios.put(`/api/client/${id}`, values)

            if(result?.data?.status === 'success') {

                return true
            }

            return false
            
        },
        async deleteCliente({commit}, id) {

            const result =  await axios.delete(`/api/client/${id}`)

            if(result?.data?.status === 'success') {
                return true
            }

            return false
            
        },
    },
    plugins: [createLogger()]
})

export default store