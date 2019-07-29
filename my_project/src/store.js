import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    new_num: 1,
  },
  mutations: {
    
    addProductNum: function (state, num) {
      if (num)
        state.new_num += num;
      else
        state.new_num = 0;
    }
  },
  actions: {
    addProductNumFun: function (context, num) {
      context.commit('addProductNum', num);
    }
  }
})
