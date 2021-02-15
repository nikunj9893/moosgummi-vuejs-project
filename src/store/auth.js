import { start } from 'chromedriver';
import Vue from 'vue'

export default {
  state: {
    access_token: null,
    activeTab:0,
    user: {},
    ActiveTab: 5,
    invoiceData: {
     
    }
  },
  getters: {
    getTokenFromCookies() {
      return Vue.$cookies.get('access');
    },

    getActiveTab: (state) => state.ActiveTab,
    getinvoiceData: (state) => {
      return state.invoiceData;
     }
  },
  mutations: {
    setInfo(state, info) {
      state.access_token = info.access_token;
      state.user = info.user;
      Vue.$cookies.set('access', info.access_token, 60 * 60 * 24 * 7);
    },
  
    resetAuthData(state) {
      state.access_token = null;
      state.user = {};
      Vue.$cookies.remove('access');
    },
    SetActiveTab: (state, tabNo) => state.ActiveTab = tabNo,
    
    setInvoiceData: (state,invoiceData ) => {
      state.invoiceData =invoiceData 
    }
  },
  actions: {
    setUserAndToken({ commit }, info) {
      commit('setInfo', info);
    },

    setInvoiceData({ commit }, debitor_id, debitor_invoice_id, tab, debitor_name) { 
      commit('setInvoiceData', debitor_id, debitor_invoice_id, tab, debitor_name);
    },
    
    resetAuth({ commit }) {
      commit('resetAuthData');
    },

    SetActiveTab({commit},tabNo) { 
      commit('SetActiveTab',tabNo)
    }
  }
}
