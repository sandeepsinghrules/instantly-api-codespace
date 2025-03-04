<template>

  <div>
    <panel-navigation>

        <div class="float-right">
            <div class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer float-left" @click="$router.push({ name: 'local_recon_dashboard'})"><i class="fa fa-chevron-left"> </i> Back</div>
        </div>
      
      <h1 class="text-lg font-semibold mb-4">Reports</h1>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

      <div v-if="searches.length == 0 && !fetchingData" class="flex flex-col justify-center items-center">
          <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No reports yet.</div>
      </div>

      <template v-if="!fetchingData && searches.length > 0">

        <div class="justify-between items-start mb-3">
          <menu-reports-actions
            @delete="bulkDelete"

            class="float-left"
            >

            <div class="flex flex-row items-center px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
              <span class="mr-2">Actions</span>
              <span class="text-xs" style="padding-top: 3px;">
                <font-awesome-icon icon="chevron-down"  />
              </span>
            </div>

          </menu-reports-actions>
        </div>

        <br clear="all" /><br clear="all" />

        <div class="overflow-x-scroll">
          <table class="w-full">
            <thead class="border-b border-gray-100 w-full">
                <tr>
                  <th></th>
                  <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Business</th>
                  <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/2 uppercase">Location</th>
                  <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Date</th>
                  <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody class="w-full" style="">
                <tr v-for="search in searches" :key="search.id" class="hover:bg-gray-100">
                    <td class="border-l border-b border-r border-gray-100 px-2">
                      <input class="styled-checkbox" :id="search.id+'-checkbox'" type="checkbox" v-model="selectedIds" :value="search.id">
                      <label :for="search.id+'-checkbox'"></label>
                    </td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100"><a href="javascript: void(0);" @click="openSearchReport(search)">{{ search.keyword }}</a></td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">
                        {{ search.properties.formatted_address }}
                    </td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ formatDate(search.created_at) }}</td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">
                        <div class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center mr-2" @click="openSearchReport(search)">
                            <i class="fa fa-file-alt mr-2"></i>
                            <span class="whitespace-no-wrap">View Report</span>
                        </div>

                        <div class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 mt-1 rounded cursor-pointer flex flex-row items-center mr-2" v-clipboard:copy="getSearchReportUrl(search)" v-clipboard:success="onCopy" v-clipboard:error="onError">
                            <i class="fa fa-copy mr-2"></i>
                            <span class="whitespace-no-wrap">Copy Report Link</span>
                        </div>
                    </td>
                </tr>
            </tbody>
           </table>

          <v-pagination v-if="!fetchingData && searches.length > 0"
            class="mt-3"
            v-model="page"
            :length="count"
          ></v-pagination>
        </div>
      </template>

    </panel-navigation>
  </div>

</template>

<script>
import PanelNavigation from '@/components/PanelNavigation.vue'
import MenuReportsActions from '@/components/menus/menuReportsActions.vue'
import moment from 'moment-timezone'
import axios from 'axios'

export default {
  metaInfo () {
    return {
      title: "Reports | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuReportsActions
  },
  data() {
    return {
      selectedIds: [],
      searches: [],
      count: 0,
      page: 1,
      fetchingData: true
    }
  },
  methods: {
    async getSearches(page = 1) {
      let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/searches?page=' + page, {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      this.searches = response.data.searches;
      this.count = response.data.count;
      this.fetchingData = false;
    },
    
    async bulkDelete() {
      await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-reports', {
          ids: this.selectedIds
        },
        {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      await this.getSearches();

      this.selectedIds = []
    },
    
    openSearchReport(search) {
        window.open(window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id);
    },
    
    getSearchReportUrl(search) {
        return window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id;
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
    
    onCopy: function (e) {
        this.$swal({
            title: "Copied",
            text: "URL copied successfully!",
            showCancelButton: false,
            });
    },
    onError: function (e) {
        alert('Failed to copy the text to the clipboard')
        console.log(e);
    },
  },
  created() {
    this.getSearches();
  },
  watch: {
    page: function(val, oldVal) {
      this.getSearches(this.page);
    }
  }
}
</script>

<style lang="scss" scoped>

.styled-checkbox {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
  }

  // Box.
  & + label:before {
    content: '';
    margin-right: 0px;
    display: inline-block;
    vertical-align: text-top;
    width: 20px;
    height: 20px;
    background: rgb(228, 228, 228);
  }

  // Box hover
  /*&:hover + label:before {
    background: #f35429;
  }*/
  
  // Box focus
  &:focus + label:before {
    
    border-width: 0;
  }

  // Box checked
  &:checked + label:before {
    background: #48bb78;
  }
  
  // Disabled state label.
  &:disabled + label {
    color: #b8b8b8;
    cursor: auto;
  }

  // Disabled box.
  &:disabled + label:before {
    box-shadow: none;
    background: #ddd;
  }

  // Checkmark. Could be replaced with an image
  &:checked + label:after {
    content: '';
    position: absolute;
    left: 5px;
    top: 9px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 
      2px 0 0 white,
      4px 0 0 white,
      4px -2px 0 white,
      4px -4px 0 white,
      4px -6px 0 white,
      4px -8px 0 white;
    transform: rotate(45deg);
  }
}

.btn-invite {
  background-color: #00ad9e;
}

table tbody tr {
  transition: all 0.1s linear;
}

table tbody tr:hover {
  background-color: rgb(245, 245, 245);
}
</style>
