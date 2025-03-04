<template>

    <panel-navigation>
        <div>
            <h1 class="text-lg font-semibold mb-4">Local Recon</h1>

            <v-skeleton-loader v-if="fetchingData" type="article, table, table"></v-skeleton-loader>

            <div class="-mx-2" v-if="!fetchingData">
                <div class="flex flex-row flex-wrap mb-3">
                    <div class="w-full px-2 mb-4 md:w-1/3 lg:w-1/3">
                        <div class="bg-gray-200 px-3 py-2 rounded-t flex flex-row items-center justify-between">
                        <div>Leads</div>
                        <router-link to="/local-recon/leads" class="float-right" style="color: rgba(0, 0, 0, 0.87); font-size: 12px;">View All</router-link>
                    </div>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        <div class="text-center">
                            <span class="text-2xl" style="font-size: 40px;">{{ this.dashboard_data.leads_count }}</span>
                        </div>
                    </v-card>
                    </div>

                    <div class="w-full px-2 mb-4 md:w-1/3 lg:w-1/3">
                        <div class="bg-gray-200 px-3 py-2 rounded-t flex flex-row items-center justify-between">
                        <div>Reports</div>
                        <router-link to="/local-recon/reports" class="float-right" style="color: rgba(0, 0, 0, 0.87); font-size: 12px;">View All</router-link>
                    </div>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        <div class="text-center">
                            <span class="text-2xl" style="font-size: 40px;">{{ this.dashboard_data.searches_count }}</span>
                        </div>
                    </v-card>
                    </div>
                    <div class="w-full px-2 mb-4 md:w-1/3 lg:w-1/3">
                        <div class="bg-gray-200 px-3 py-2 rounded-t flex flex-row items-center justify-between">
                        <div>Widgets</div>
                        <router-link to="/local-recon/widgets" class="float-right" style="color: rgba(0, 0, 0, 0.87); font-size: 12px;">View All</router-link>
                    </div>
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                    >
                        <div class="text-center">
                            <span class="text-2xl" style="font-size: 40px;">{{ this.dashboard_data.widgets_count }}</span>
                        </div>
                    </v-card>
                    </div>
                </div>
            </div>

            <div v-if="!fetchingData">

                <div class="w-full mb-4" >
                    <div class="bg-gray-200 px-3 py-2 rounded-t flex flex-row items-center justify-between">
                    <div>Latest Leads</div>
                    </div>
                    <div :class="((dashboard_data.latest_leads.length == 0) ? 'bg-gray-100 rounded-b' : 'pa-2 v-card v-sheet v-sheet--outlined theme--light rounded-0')">

                    <div v-if="dashboard_data.latest_leads.length == 0" class="flex flex-col justify-center items-center">
                        <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No leads yet.</div>
                    </div>

                    <div v-else class="p-1">
                        <table class="w-full">
                            <thead class="border-b border-gray-100 w-full">
                                <tr>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/4 uppercase">Lead Details</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Business</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/4 uppercase">Address</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Request Type</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Date</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/8 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="w-full" style="">
                                <tr v-for="lead in dashboard_data.latest_leads" :key="lead.id" class="hover:bg-gray-100">
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
                                    </td>
                                </tr>
                            </tbody>
                            </table>
                    </div>

                    </div>
                </div>
            </div>

            <div v-if="!fetchingData">

                <div class="w-full mb-4" >
                    <div class="bg-gray-200 px-3 py-2 rounded-t flex flex-row items-center justify-between">
                    <div>Latest Reports</div>
                    </div>
                    <div :class="((dashboard_data.latest_searches.length == 0) ? 'bg-gray-100 rounded-b' : 'pa-2 v-card v-sheet v-sheet--outlined theme--light rounded-0')">

                    <div v-if="dashboard_data.latest_searches.length == 0" class="flex flex-col justify-center items-center">
                        <div class="text-center mt-6 mb-12 font-semibold text-gray-600 text-lg">No searches yet.</div>
                    </div>

                    <div v-else class="p-1">
                        <table class="w-full">
                            <thead class="border-b border-gray-100 w-full">
                                <tr>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Business</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/2 uppercase">Location</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Date</th>
                                <th class="text-xs text-gray-600 font-semibold text-left py-2 px-2 whitespace-no-wrap w-1/6 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="w-full" style="">
                                <tr v-for="search in dashboard_data.latest_searches" :key="search.id" class="hover:bg-gray-100">
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
                    </div>

                    </div>
                </div>
            </div>
        </div>
  </panel-navigation>

</template>

<script>
    import { mapState } from 'vuex'
    import PanelNavigation from '@/components/PanelNavigation.vue'
    import moment from 'moment'
    import axios from 'axios'

    export default {
        metaInfo () {
            return {
                title: "Local Recon | Dashboard "
            }
        },
        components: {
            PanelNavigation
        },
        computed: {
            ...mapState({
                me: state => state.me.me
            })
        },
        data() {
            return {
                fetchingData: true,
                dashboard_data: false
            }
        },
        methods: {
            formatDate: function(date) {
                return moment(String(date)).format('MMM DD, YYYY')
            },
            async fetchDashboardData() {
                let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/dashboard', {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })

                this.dashboard_data = response.data;
                this.fetchingData = false;
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
            openSearchReport(search) {
                window.open(window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id);
            },
            getSearchReportUrl(search) {
                return window.location.origin + '/rf?s=' + search.widget.uuid + '&p=' + search.place_id;
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
            this.fetchDashboardData();
        }
    }
</script>