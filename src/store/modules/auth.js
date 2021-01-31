import axios from 'axios'
export default({
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  getters: {
    authenticated(state){
      return state.token && state.user
    },
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_USER(state, data){
      state.user = data
    }
  },
  actions: {
    async loginUser({ dispatch },credentials){
      let response = await axios.post('http://localhost:2020/api/auth/login',credentials)
      dispatch('attempt',response.data.access_token)
    },
    async attempt({commit, state},token){
      if(token){
        commit('SET_TOKEN',token)
      }
      if(!state.token){
        return
      }

      try{
        let response = await axios.get('http://localhost:2020/api/auth/me')
        commit('SET_USER',response.data)

      }catch(e){
        console.log("ERROR!!",e)
        commit('SET_TOKEN',null)
        commit('SET_USER',null)
      }
    },
    signOut({commit}){
      console.log('Signout called')
      return axios.post('http://localhost:2020/api/auth/logout').then(()=>{
        commit('SET_TOKEN',null)
        commit('SET_USER',null)
      })
    }
  },
})
