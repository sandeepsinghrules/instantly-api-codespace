import axios from 'axios'

export default {
  namespaced: true,
  state: {
    jwt: null
  },
  getters: {
    /*id: (state) => {
      return JSON.parse(atob(state.jwt.split('.')[1])).id;
    }*/
  },
  mutations: {
    login(state, token) {
      state.jwt = token
    },
    logout(state) {
      state.jwt = null
    }
  },
  actions: {
    login({ commit }, { email, password }) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/login`, {
            email,
            password
          })
          if (response.status == 200) {

            if (response.data.company_type == "location") {
              this.state.auth.is_location = true;
            }
            else {
              this.state.auth.is_location = false;
            }

            commit('login', response.data.token)
            resolve()
            return;
          }
        } catch (error) {
          reject(error.response.data.message)
          return
        }

        reject()

      })
    },
    signup(_, payload) {
      return new Promise(async (resolve, reject) => {

        try {
          let response = await axios.post(`${process.env.VUE_APP_API_ENDPOINT}/register`, payload)
          if (response.status == 200) {
            resolve()

            console.log(response);

            // window.analytics.identify(response.data.user.gosquared_person_id, {
            //   name: response.data.user.first_name + " " + response.data.user.last_name,
            //   email: response.data.user.email,
            //   type: response.data.user.company_type
            // });

            this.state.auth.jwt = response.data.token;
            
            return;
          }
        } catch (error) {
          //console.log(error.response.data.message)
          reject(error.response.data)
          return
        }

        reject()

      })
    },
    logout({ commit }) {
      setTimeout(function() {
        analytics.reset()
      }, 2000);

      commit('logout')
    }
  }
}