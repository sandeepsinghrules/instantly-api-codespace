<template>

    <div>
        <panel-navigation>
        </panel-navigation>
        <div class="container flex flex-row items-top justify-between">
            <h1 class="text-lg font-semibold ">Logs</h1>
        </div>
        <hr class="border-b border-gray-100 mb-3">
        <div class="dashboard-box settings-wrapper">
            <v-container  v-if="search">
                <v-card>
                    <div class="p-3 table-responsive">
                        <table class="table table-bordered" >
                                <tbody>
                                   
                                    <tr>
                                        <th scope="row" class="text-left">Url:</th>
                                        <td class="text-left">{{search.website_url}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Api Endpoint:</th>
                                        <td class="text-left">{{search.api_endpoint}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Status:</th>
                                        <td class="text-left">  <v-chip
                                    class=""
                                    small
                                    color="red lighten-5"
                                    text-color="red lighten-1"
                                    v-if="search.status == 'failed'"
                                  >
                                    failed
                                  </v-chip>

                                  <v-chip
                                    class=""
                                    small
                                    color="green lighten-5"
                                    text-color="green lighten-1"
                                    v-if="search.status == 'success'"
                                  >
                                  success
                                  </v-chip></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Duration:</th>
                                        <td class="text-left">{{search.duration}}s</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Retry:</th>
                                        <td class="text-left">{{search.retries}}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Api Key:</th>
                                        <td class="text-left"><strong>{{apiKey}}</strong></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" class="text-left">Date:</th>
                                        <td class="text-left">{{ formatDate(search.date) }}</td>
                                    </tr>
                                </tbody>
                        </table>
                    </div>
                    <hr class="border-b border-gray-100 mb-3">
                            <div class="container flex flex-row items-top justify-between">
                                <h2 class="text-lg font-semibold ">Result</h2>
                            </div>
                            <b-card>
                                <pre class="code-editor" style="white-space: pre-wrap;">{{ JSON.parse(search.result) }}</pre>
                        </b-card>

                </v-card>
            </v-container>
        </div>
    </div>


</template>

<script>
import { mapState } from 'vuex'
import PanelNavigation from '@/components/PanelNavigation.vue'
import axios from 'axios'
import moment from 'moment'
export default {
  metaInfo () {
    return {
      title: "Logs Results | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
  },
  data(){
    return{
        search :null,
        apiKey:null
    }
  },
  computed: {
    ...mapState({
      me: state =>JSON.parse(state.loginuser),
      
    }),
  },
  methods:{
    async getSearch(){
            axios.get(process.env.VUE_APP_API_ENDPOINT + '/api/getlogsbyid', {
            headers: {
                    'Authorization': `Bearer ${JSON.parse(this.$store.getters.jwtToken)}`
                },
            params: {
            id: this.$route.params.id,
            }
        })
         .then(response => {
                this.search = response.data.results

                axios.get(process.env.VUE_APP_API_ENDPOINT + '/api/getapibyid', {
                    headers: {
                    'Authorization': `Bearer ${JSON.parse(this.$store.getters.jwtToken)}`
                    },
                    params: {
                    }
                }).then((responseData) => {
                    this.apiKey = responseData.data.results.api_key;
                });
            })
            .catch(error => {
            console.log(error)
            })
    },
    formatDate: function(date) {
      return moment(String(date)).format('MM/DD/YYYY h:m:ss')
    },
    copyCode() {
      const el = document.createElement('textarea')
      el.value = this.code
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
  },
  mounted() {
    this.getSearch();
  },
}
</script>

<style scoped>
    .table-bordered th, .table-bordered td {
    border: 1px solid #dee2e6;
    border-collapse: separate;
    border-spacing: 0;
    padding: .75rem;
    vertical-align: top;
    }

    .table-bordered th {
    background-color: #f8f9fa;
    }
    .code-editor {
        background-color: #1e1e1e;
        color: #d4d4d4;
        padding: 10px;
        font-family: Consolas, 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
        overflow-x: auto;
        }
</style>