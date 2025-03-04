<template>
    <div>
         <panel-navigation>
         </panel-navigation>

         <div class="container">

            <v-row class="dashboard-box p-3">
                <v-col cols="12" md="6">
                    <div class="dashboard-box ">
                        <v-card
                            class="pa-2"
                            tile
                            >
                            <v-card-title>Proxy Logs Summary</v-card-title>


                            <hr class="border-b border-gray-100 mb-3">

                        
                            <v-row class="p-2">
                                <v-col cols="12" md="6">
                                    <p class="mb-1 text-xs"><strong>Select Period:</strong></p>
                                    <v-select
                                    v-model="selectedPeriod"
                                    :items="periodOptions"
                                    item-text="label"
                                    item-value="value"
                                    label="Select Period"
                                    clearable
                                    hide-no-data
                                    solo
                                    ></v-select>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <p class="mb-1 text-xs"><strong>Select Network:</strong></p>
                                    <v-select
                                    v-model="selectedNetwork"
                                    :items="networkOptions"
                                    item-text="label"
                                    item-value="value"
                                    label="Select Network"
                                    clearable
                                    hide-no-data
                                    solo
                                    >
                                    </v-select>
                                </v-col>
                            </v-row>


                                <!-- Loader when fetching data -->
                            <v-skeleton-loader v-if="loading" type="article, article, article"></v-skeleton-loader>

                            <hr class="border-b border-gray-200">

                            <div class="mt-2" v-if="!loading && summaryData">
                                <div class="flex flex-row flex-wrap mb-4">
                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                                        <v-card
                                            class="pa-2"
                                            tile
                                        >
                                            <div class="p-3">
                                            <div class="dashboard-box-title">Total </div>

                                            <div class="stats-box-number">{{ summaryData.total }}</div>
                                            
                                            <!-- <div class="stats-box-icon-bg"></div>
                                            <div class="stats-box-icon">
                                                <i class="mdi mdi-account-multiple"></i>
                                            </div> -->
                                            </div>
                                        </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                                        <v-card
                                            class="pa-2"
                                            tile
                                        >
                                            <div class="p-3">
                                            <div class="dashboard-box-title">Success </div>

                                            <div class="stats-box-number">{{ summaryData.success }}</div>
                                            
                                            <!-- <div class="stats-box-icon-bg"></div>
                                            <div class="stats-box-icon">
                                                <i class="mdi mdi-approval"></i>
                                            </div> -->
                                            </div>
                                        </v-card>
                                    </div>

                                    <div class="dashboard-box stats-box w-full px-2 md:w-1/3 lg:w-1/3">
                                        <v-card
                                            class="pa-2"
                                            tile
                                        >
                                            <div class="p-3">
                                            <div class="dashboard-box-title">Fail </div>

                                            <div class="stats-box-number">{{ summaryData.fail }}</div>
                                            
                                            <!-- <div class="stats-box-icon-bg"></div>
                                            <div class="stats-box-icon">
                                                <i class="mdi mdi-alert-outline"></i>
                                            </div> -->
                                            </div>
                                        </v-card>
                                    </div>
                                </div>
                            </div>


                            
                            <v-card v-if="!loading && !summaryData" class="p-4 mt-4">
                                <strong>No Data Available</strong>
                            </v-card>
                    
                        </v-card>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="dashboard-box ">
                        <v-card class="">
                            <v-card-title>Network Hit Summary</v-card-title>
                            <hr class="border-b border-gray-100">
                            
                            <div>
                                <apexchart 
                                type="bar" 
                                height="275" 
                                :options="chartOptions" 
                                :series="chartSeries">
                                </apexchart>
                            </div>
                        </v-card>
                    </div>
                </v-col>
            </v-row>

        </div>


 
         <hr class="border-b border-gray-100 ">
 
         <v-skeleton-loader v-if="fetchingSearches" type="article, article, article"></v-skeleton-loader>
         
           <div class="dashboard-box p-3" v-if="!fetchingSearches && proxies.length == 0">
             <v-card
               class="pa-2"
               tile
             >
               <div class="p-3">
 
                 <br /><br /><br /><br />
 
                 <div class="dashboard-box-iconsquare">
                   <div class="dashboard-box-icon-background"></div>
                   <div class="dashboard-box-icon">
                     <i class="mdi mdi-briefcase-outline"></i>
                   </div>
                 </div>
 
                 <div style="text-align: center;">
                   <div class="pt-2 pb-2">
                     <strong>No Proxies Yet</strong>
                   </div>
 
                   <br />
 
                   <div @click="openOtherWebsite" class="border-1 border-blue bg-blue text-white text-xs text-bold px-4 py-2 inline-block rounded cursor-pointer" style="margin-top: -5px;"><i class="fa fa-file  mr-2"></i> View API Docs</div>
                 </div>
                 
                 <br /><br /><br /><br /><br />
               </div>
             </v-card>
           </div>
 
 
 
           <template v-if="!fetchingSearches && proxies.length > 0">
 
             <div v-if="$vuetify.breakpoint.xs" class="p-3">
                 <div v-for="proxy in proxies" :key="proxy.id" class="dashboard-box mb-4">
                   <v-card
                     class=""
                     tile
                   >
                     <div class="p-2" style="position: relative;">
                       <div>



                         <div> 
                            <strong>
                            <span class="text-sm mb-2">{{ proxy.url }}</span>  
    
                            <br />
                            </strong>    

                            <div class="d-flex mt-3">
                                <span style="font-size: 12px; color: #757B89;">
                                   Last Used: 
                                   <v-chip
                                            class=""
                                            small
                                            color="orange lighten-5"
                                            text-color="orange lighten-1"
                                        >
                                        {{ formatDate(proxy.last_used) }}
                                    </v-chip>
                                </span> 
                            </div>
                            <div class="pt-3">
                                    <router-link :to="'/logsearch/' + proxy.id">
                                    <span style="color: #3A9BDB; opacity: 0.7; font-weight: bold; font-size: 12px;">View Results</span>
                                    </router-link>
                            </div>
                        </div>
                         
                       </div>
                       
                       <div style="clear: both;"></div>
                     </div>
                   </v-card>
                 </div>
                 <div class="float-right">
                   <v-pagination
                     v-model="currentPage"
                     :length="Math.ceil(totalItems / perPage)"
                     :total-visible="9"
                     color="primary"
                     rounded="circle"
                     ></v-pagination>
                 </div>
             </div>
 
 
             <div  v-else class="dashboard-box settings-wrapper" style="margin-top: -1.5rem;">
             
                 <v-container>
                         <v-card>
                           <div class="p-3">
 
                             <!-- <div class="float-left mb-3">
                               <v-text-field
                                 prepend-inner-icon="mdi-magnify"
                                 placeholder="Search"
                                 dense
                                 outlined
                                 hide-details
                                 style="border: solid 1px #CCCCCC; width: 300px;"
                                 v-model="search"
                               >
                                 
                               </v-text-field>
                             </div> -->
 
                           
 
                             <br clear="all" />
 
                             <div class="pt-2 overflow-x-auto" style="height: 500px;">
                               
                               <table class="w-full rg-datatable">
                                 <thead class="border-b border-gray-100 w-full">
                                   <tr>
                                     <th>PROXY URL</th>
                                     <th>LAST USED</th>
                                     <th>TOTAL FAILED</th>
                                     <th>GOOGLE</th>
                                     <th>FACEBOOK</th>
                                     <th>BING</th>
                                     <th>YAHOO</th>
                                     <th>YELP</th>
                                     <th>FOURSQUARE</th>
                                     <th>BBB</th>
                                     <th>MAPQUEST</th>
                                     <th>YELLOWPAGES</th>
                                     <th>MERCHANTCIRCLE</th>
                                     <th>CITYSEARCH</th>
                                     <th>SUPERPAGES</th>
                                     <th>CHAMBEROFCOMMERCE</th>
                                     <th>BROWNBOOKS</th>
                                     <th>YELLOWBOT</th>
                                     <th>BOTW</th>
                                     <th>DEXKNOWS</th>
                                     <th>INSIDERPAGES</th>
                                     <th>SALESPIDER</th>
                                     <th>SHOWMELOCAL</th>
                                     <th>CORTERA</th>
                                     <th>ENROLLBUSINESS</th>
                                     <th>DATAAXLE</th>
                                     <th>CITYSQUARES</th>
                                     <th>LOCALEZE</th>
                                     <th>FINDLOCAL</th>
                                     <th>YASABE</th>
                                     <th>LOCALSTACK</th>
                                     <th>INFOBEL</th>
                                     <th>BESTIMPROVERS</th>
                                     <th>CITYSEEKER</th>
                                     <th>LOCAL</th>
                                     <th>WHODOYOU</th>
                                     <th>CYBO</th>
                                     <th>MANTA</th>
                                     <th>WHITEPAGES</th>
                                     <th>ELOCAL</th>
                                     <th>JUSTLANDED</th>
                                     <th>THECLIO</th>
                                     <th>STOREBOARD</th>
                                     <th>HOTFROG</th>
                                     <th>WAZE</th>
                                   </tr>
                                 </thead>
                                 <tbody class="w-full" style="">
                                   
                                   <tr v-for="proxy in proxies" :key="proxy.id" style="text-align: center;">
                                    <td class="text-bold">
                                        <router-link :to="'/proxy-logs/' + proxy.id" style="color: #3a9bdb; font-size: 12px;">
                                              {{ proxy.url }}
                                        </router-link>
                                     </td>

                                     <td>
                                        <v-chip
                                         class=""
                                         small
                                         color="purple lighten-5"
                                         text-color="purple lighten-1"
                                       >
                                       {{ formatDate(proxy.last_used) }}
                                       </v-chip>
                                    </td>
                                    <td>
                                        <v-chip
                                         class=""
                                         small
                                         color="red lighten-4"
                                         text-color="red lighten-1"
                                       >
                                       {{proxy.total_failed}}
                                       </v-chip>
                                    </td>
                                    <td>
                                        {{ proxy.GOOGLE }}
                                    </td>
                                    <td>
                                        {{ proxy.FACEBOOK }}
                                    </td>
                                    <td>
                                        {{ proxy.BING }}
                                    </td>
                                     <td>{{proxy.YAHOO}}</td>
                                     <td>{{proxy.YELP}}</td>
                                     <td>{{proxy.FOURSQUARE}}</td>
                                     <td>{{proxy.BBB}}</td>
                                     <td>{{proxy.MAPQUEST}}</td>
                                     <td>{{proxy.YELLOWPAGES}}</td>
                                     <td>{{proxy.MERCHANTCIRCLE}}</td>
                                     <td>{{proxy.CITYSEARCH}}</td>
                                     <td>{{proxy.SUPERPAGES}}</td>
                                     <td>{{proxy.CHAMBEROFCOMMERCE}}</td>
                                     <td>{{proxy.BROWNBOOKS}}</td>
                                     <td>{{proxy.YELLOWBOT}}</td>
                                     <td>{{proxy.BOTW}}</td>
                                     <td>{{proxy.DEXKNOWS}}</td>
                                     <td>{{proxy.INSIDERPAGES}}</td>
                                     <td>{{proxy.SALESPIDER}}</td>
                                     <td>{{proxy.SHOWMELOCAL}}</td>
                                     <td>{{proxy.CORTERA}}</td>
                                     <td>{{proxy.ENROLLBUSINESS}}</td>
                                     <td>{{proxy.DATAAXLE}}</td>
                                     <td>{{proxy.CITYSQUARES}}</td>
                                     <td>{{proxy.LOCALEZE}}</td>
                                     <td>{{proxy.FINDLOCAL}}</td>
                                     <td>{{proxy.YASABE}}</td>
                                     <td>{{proxy.LOCALSTACK}}</td>
                                     <td>{{proxy.INFOBEL}}</td>
                                     <td>{{proxy.BESTIMPROVERS}}</td>
                                     <td>{{proxy.CITYSEEKER}}</td>
                                     <td>{{proxy.LOCAL}}</td>
                                     <td>{{proxy.WHODOYOU}}</td>
                                     <td>{{proxy.CYBO}}</td>
                                     <td>{{proxy.MANTA}}</td>
                                     <td>{{proxy.WHITEPAGES}}</td>
                                     <td>{{proxy.ELOCAL}}</td>
                                     <td>{{proxy.JUSTLANDED}}</td>
                                     <td>{{proxy.THECLIO}}</td>
                                     <td>{{proxy.STOREBOARD}}</td>
                                     <td>{{proxy.HOTFROG}}</td>
                                     <td>{{proxy.WAZE}}</td>
                                   </tr>
                                 </tbody>
                               </table>
 
                             </div>
                             <div class="float-right mt-2">
                                 <v-pagination
                                   v-model="currentPage"
                                   :length="Math.ceil(totalItems / perPage)"
                                   :total-visible="9"
                                   color="primary"
                                   rounded="circle"
                                   ></v-pagination>
                               </div>
 
                               <div style="clear: both;"></div>
                             </div>
                         </v-card>
                     </v-container>
             </div>
           </template>
 
    </div>
 </template>
 
 <script>
 import axios from 'axios'
 import { mapState } from 'vuex'
 import moment from 'moment'
 import PanelNavigation from '@/components/PanelNavigation.vue'
 export default {
 
 metaInfo () {
     return {
       title: "Proxies | " + this.$appName
     }
   },
   components: {
     PanelNavigation,
   },
   data() {
     return {
       selectedIds: [],
       proxies: [],
       currentPage: 1,
       perPage: 50,
       totalItems: 0,
       loading: false,
       search : null,
       fetchingSearches:null,
       periodOptions: [
       { label: '1 Hour', value: '1 HOUR' },
        { label: '12 Hours', value: '12 HOUR' }, 
        { label: '1 Day', value: '1 DAY' },
        { label: '2 Days', value: '2 DAY' },
        { label: '1 Week', value: '1 WEEK' },
        { label: '1 Month', value: '1 MONTH' },
      ],
      selectedPeriod: '1 DAY', 
      selectedNetwork: 'All', 
      networkOptions: [{ label: 'All', value: 'All' }],
      summaryData: null,
      chartSeries: [], // Series data for the chart
      chartOptions: {
        chart: {
          id: "network-hits-bar-chart",
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: [], // X-axis labels for the networks
          labels: {
            show: true, // Ensure labels are visible
            rotate: -45, // Rotate labels for better visibility if necessary
            style: {
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif'
            }
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '50%', // Adjust width of bars to ensure space for labels
            distributed: true   // Ensures each bar has its own color and label below
          }
        },
        title: {
          text: 'Number of Hits by Network',
          align: 'center'
        }
      },
     }
   },
   computed: {
     ...mapState({
       user_id: state => JSON.parse(state.loginuser).id,
      
     }),
     
   },
   mounted() {
     this.fetchProxies();
     this.fetchNetworkOptions();
     this.fetchSummaryDataHits();
     this.fetchSummaryData();
   
   },
   methods: {
     openOtherWebsite() {
       window.open('https://docs.instantlyapi.com/', '_blank');
     },
     fetchProxies() {
      
       this.loading = true
       axios.get(process.env.VUE_APP_API_ENDPOINT + '/proxy/getproxy', {
         headers: {
                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem("token"))}`
             },
         params: {
           page: this.currentPage,
           limit: this.perPage,
           query:this.search
         }
       })
         .then(response => {
           this.proxies = response.data.proxies
           this.totalItems = response.data.total
           this.loading = false
         })
         .catch(error => {
           console.log(error)
         })
     },
     formatDate: function(date) {
       // return moment(String(date)).fromNow()
       return  moment(String(date)).format('llll')
     },
     formatTime: function(time) {
       return time.toFixed(2)
     },
     fetchNetworkOptions() {
      // Fetch network options from the API
      axios.get(process.env.VUE_APP_API_ENDPOINT + '/proxy/networks')
        .then(response => {
       
            this.networkOptions = [{ label: 'All', value: 'All' }, ...response.data.map(network => ({
                label: network.symbol,
                value: network.symbol,
            }))];
        })
        .catch(error => {
          console.error('Error fetching network options:', error)
        })
    },

    fetchSummaryData() {
      if (!this.selectedPeriod || !this.selectedNetwork) {
        return
      }

      this.loading = true

      axios.get(process.env.VUE_APP_API_ENDPOINT + '/proxy/logs-summary', {
        params: {
          period: this.selectedPeriod,
          network: this.selectedNetwork === 'All' ? null : this.selectedNetwork
        }
      })
        .then(response => {
          this.summaryData = response.data
          this.loading = false
        })
        .catch(error => {
          console.error('Error fetching summary data:', error)
          this.loading = false
        })
    },
    async fetchSummaryDataHits() {
        const response = await fetch(process.env.VUE_APP_API_ENDPOINT + '/proxy/top-network-hits');
        const data = await response.json();

        if (data.success) {
        const hitCounts = data.data.map(item => item.hit_count);
        const networkSymbols = data.data.map(item => item.network_symbol); // Extract network_symbol

        // console.log("Hit Counts:", hitCounts); 
        // console.log("Network Symbols:", networkSymbols); 

        // Reset chart data to ensure reactivity
        this.chartSeries = [];
        this.$nextTick(() => {
            this.chartSeries = [{
            name: 'Hits',
            data: hitCounts
            }];

            // Reset the entire chartOptions object to ensure reactivity
            this.chartOptions = {
            ...this.chartOptions,
            xaxis: {
                ...this.chartOptions.xaxis,
                categories: networkSymbols
            }
            };

            // console.log("Categories Updated:", this.chartOptions.xaxis.categories);


            // this.$refs.chart.updateOptions(this.chartOptions);
        });
        }

        this.loading = false;
    }

 
   },
   watch: {
     currentPage(val) {
       this.fetchProxies()
     },
     perPage(val) {
       this.fetchProxies()
     },
     search(val){
       setTimeout(() => {
         this.fetchProxies()
       }, 1000);
      
     },
     selectedPeriod() {
      this.fetchSummaryData()
    },
    selectedNetwork() {
      this.fetchSummaryData()
    }
   }
 }
 </script>
 <style scoped>
</style>