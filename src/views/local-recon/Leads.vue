<template>

  <div>
    <panel-navigation>

        <div class="float-right">
            <div class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded cursor-pointer float-left" @click="$router.push({ name: 'local_recon_dashboard'})"><i class="fa fa-chevron-left"> </i> Back</div>
        </div>
      
      <h1 class="text-lg font-semibold mb-4">Leads</h1>

      <hr class="border-b border-gray-100 mb-3">

      <v-skeleton-loader v-if="fetchingData" type="article, article, article"></v-skeleton-loader>

      <div v-if="leads.length == 0 && !fetchingData" class="flex flex-col justify-center items-center">
          <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No leads yet.</div>
      </div>

      <template v-if="!fetchingData && leads.length > 0">

        <div class="justify-between items-start mb-3">
          <menu-lead-actions
            @delete="bulkDelete"

            class="float-left"
            >

            <div class="flex flex-row items-center px-4 py-2 rounded bg-gray-500 hover:bg-gray-400 text-white cursor-pointer">
              <span class="mr-2">Actions</span>
              <span class="text-xs" style="padding-top: 3px;">
                <font-awesome-icon icon="chevron-down"  />
              </span>
            </div>

          </menu-lead-actions>
        </div>

        <br clear="all" /><br clear="all" />

        <div class="overflow-x-scroll">
          <table class="w-full">
            <thead class="border-b border-gray-100 w-full">
                <tr>
                <th></th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/4 uppercase">Lead Details</th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Business</th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/4 uppercase">Address</th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Request Type</th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Date</th>
                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody class="w-full" style="">
                <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-100">
                  <td class="border-l border-b border-r border-gray-100 px-2">
                    <input class="styled-checkbox" :id="lead.id+'-checkbox'" type="checkbox" v-model="selectedIds" :value="lead.id">
                    <label :for="lead.id+'-checkbox'"></label>
                  </td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">
                        <div v-if="lead.first_name || lead.last_name">
                            {{ lead.first_name }} {{ lead.last_name }}
                        </div>
                        <a :href="'mailto:' + lead.email">{{ lead.email }}</a>
                    </td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ lead.company_name || "-" }}</td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ getLeadAddress(lead) }}</td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ ((lead.optin_type == 'view_gate') ? "Optin" : "Help Request") }}</td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">{{ formatDate(lead.created_at) }}</td>
                    <td class="text-black py-2 text-sm pl-2 border-b border-r border-gray-100">
                        <div class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center mr-2" @click="openLeadReport(lead)">
                            <i class="fa fa-file-alt mr-2"></i>
                            <span class="whitespace-no-wrap">View Report</span>
                        </div>

                        <!-- <div class="bg-orange-300 text-xs text-yellow-900 font-semibold py-1 px-2 rounded cursor-pointer flex flex-row items-center mr-2" @click="openLeadReport(lead)">
                            <i class="fa fa-file-alt mr-2"></i>
                            <span class="whitespace-no-wrap">Delete</span>
                        </div> -->
                    </td>
                </tr>
            </tbody>
          </table>

          <v-pagination v-if="!fetchingData && leads.length > 0"
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
import MenuLeadActions from '@/components/menus/menuLeadActions.vue'
import moment from 'moment-timezone'
import axios from 'axios'

export default {
  metaInfo () {
    return {
      title: "Leads | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    MenuLeadActions
  },
  data() {
    return {
      selectedIds: [],
      leads: [],
      count: 0,
      page: 1,
      fetchingData: true
    }
  },
  methods: {
    async getLeads(page = 1) {
      let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/leads?page=' + page, {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      this.leads = response.data.leads;
      this.count = response.data.count;
      this.fetchingData = false;
    },
    async bulkDelete() {
      await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/delete-leads', {
          ids: this.selectedIds
        },
        {
          headers: {
              'Authorization': 'Bearer ' + this.$store.state.auth.jwt
          },
      })

      await this.getLeads();

      this.selectedIds = []
    },

    getLeadAddress(lead) {
        let items = [];

        if (lead.company_address)
            items.push(lead.company_address);

        if (lead.city)
            items.push(lead.city);

        if (lead.state)
            items.push(lead.state);

        if (lead.zip)
            items.push(lead.zip);

        if (items.length == 0)
            return "-";
        
        return items.join(", ");
    },
    openLeadReport(lead) {
        window.open(window.location.origin + '/rf?s=' + lead.search.widget.uuid + '&p=' + lead.search.place_id);
    },

    fromNow(date) {
      return moment.utc(date).local().fromNow();
    },

    formatDate: function(date) {
      return moment(String(date)).format('MMM DD, YYYY')
    },
  },
  created() {
    this.getLeads();
  },
  watch: {
    page: function(val, oldVal) {
      this.getLeads(this.page);
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
