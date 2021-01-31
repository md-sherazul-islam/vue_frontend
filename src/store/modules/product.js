import axios from 'axios'
export default{
  state: {
    products: null,
  },
  getters: {
    products(state){
      return state.products
    }
  },
  mutations: {
    SET_PRODUCT(state,data){
      state.products = data
    }
  },
  actions: {
    async loadData({commit}){
      let response = await axios.get('http://localhost:2020/api/products')
      console.log(response.data)
      commit('SET_PRODUCT', response.data)
      console.log('Called')
    },

    async uploadProduct(_,products){
      let response = await axios.post('http://localhost:2020/api/products/create',products)

      console.log(response)
    }
  }
}
