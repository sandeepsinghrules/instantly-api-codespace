import axios from 'axios'

export default {
  namespaced: true,
  state:{
    success: [],
    failed:[],
    categories:[],
    total:[]
  },
  mutations:{
    setSuccess(state,success){
        state.success = success
    },
    setFailed(state,failed){
        state.failed = failed
    },
    setCategories(state,categories){
        state.categories = categories
    },
    setTotal(state,total){
        state.total = total
    },
  },
  actions:{
    setDashboardGraph: function(context, payload) {
        
     axios.get(process.env.VUE_APP_API_ENDPOINT + '/api/getrecentlogs', {
        headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
        // params: {
        //   userid: payload
 
        // }
      })
        .then(response => {
            const counts = {};
            response.data.results.forEach(element => {
              const fulldate = new Date(element.date);
              const options = { day: 'numeric', month: 'short' };
              const timestamp = fulldate.toLocaleDateString('en-US', options);
              const date = timestamp;
              if (!counts[date]) {
                counts[date] = {
                  total: 1,
                  success: element.status === 'success' ? 1 : 0,
                  failed: element.status === 'failed' ? 1 : 0
                };
              } else {
                counts[date].total++;
                counts[date].success += element.status === 'success' ? 1 : 0;
                counts[date].failed += element.status === 'failed' ? 1 : 0;
              }
            });
          
            const today = new Date();
            const last30Days = [...Array(30).keys()].map(days => {
              const date = new Date();
              date.setDate(today.getDate() - days);
              return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            }).reverse();
          
            const categories = last30Days;
            const totalData = categories.map(date => counts[date] ? counts[date].total : 0);
            const successData = categories.map(date => counts[date] ? counts[date].success : 0);
            const failedData = categories.map(date => counts[date] ? counts[date].failed : 0);
          
            context.commit('setTotal', totalData);
            context.commit('setSuccess', successData);
            context.commit('setFailed', failedData);
            context.commit('setCategories', categories);
        })
        .catch(error => {
          console.log(error)
        })
        
      }
      
}

}