// import { createStore } from "vuex";
import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import me from './modules/me'
import dashboardapex from './modules/dashboardapex'
Vue.use(Vuex)

const store =  new Vuex.Store({
    modules: {
        me,
        dashboardapex
    },
    state:{
        jwttoken : localStorage.getItem('token') || null ,
        loginuser : localStorage.getItem('user') || null, 
        UserApi : localStorage.getItem('userApi') || null,
        password: null 
    },
    
    mutations:{
        updateToken(state, token) {
            state.jwttoken = token
          },
          updateUser(state, token) {
            state.loginuser = token
          },
          updateSetUserApi(state, userApi) {
            state.UserApi = userApi
          },
          updateSetPassword(state, password) {
            state.password = password
          },
          logout(state) {
            localStorage.removeItem('token');
            // localStorage.removeItem('user');
            localStorage.removeItem('userApi');
            state.jwttoken = null;
            state.loginuser = null
            state.UserApi = null,
            state.password = null

          }
    },

    actions:{
        setJwtToken:function(context,payload){
            localStorage.setItem('token', payload);
            context.commit('updateToken',payload);
        },
        setUser:function(context,payload){
            // localStorage.setItem('user', payload);
            context.commit('updateUser',payload);
        },
        setUserApi:function(context,payload){
            localStorage.setItem('userApi', payload);
            context.commit('updateSetUserApi',payload);
        },
        setPassword:function(context,payload){
            context.commit('updateSetPassword',payload);
        },
        logout({ commit }) {     
            commit('logout')
          }
    },
    getters:{
        jwtToken:function(state){
            return state.jwttoken
        },
        loginUser:function(state){
            return state.loginuser
        },
        UserApi:function(state){
            return state.UserApi
        },
        UserPassword:function(state){
            return state.password
        }
    }
})

export default store