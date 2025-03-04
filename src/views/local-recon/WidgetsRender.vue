<template>
    <div class="lr-widget-wrapper" v-if="widget_data">
        <div v-if="widget_data.type == 'default'">
            <div id="lr-widget-html" v-html="widget_data.properties.html"></div>

            <v-combobox
                label=""
                v-model="autocompleteLocationModel"
                :items="locationFoundItems"
                :search-input.sync="locationSearchText"
                item-text="value"
                item-value="id"
                hide-no-data
                return-object
                :filter="filterPlaces"
                color="green"
                @change="selectPlace()"
            >
            </v-combobox>
        </div>

        <div v-if="widget_data.type == 'seo-audit'">
            <div id="lr-widget-seo-html" v-html="widget_data.properties.seo_audit_html"></div>
        </div>

        <div v-if="widget_data.type == 'star-rating-calculator'">
            <v-card>
                <div class="float-left" style="width: 70%; height: 330px; color: #7F7F7F;">
                    <div style="padding: 20px;">
                        <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Current Google Rating</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.current_google_rating"
                            @change="widget_data.properties.you_need_reviews = youNeedReviews();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0.1"
                            step="0.1"
                            max="5"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Current number of Google reviews</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.current_number_of_google_reviews"
                            @change="widget_data.properties.you_need_reviews = youNeedReviews();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="1"
                            max="100"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Desired Google rating</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.desired_google_rating"
                            @change="widget_data.properties.you_need_reviews = youNeedReviews();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0.1"
                            step="0.1"
                            max="5"
                            hide-details
                        ></v-slider>
                    </div>
                </div>
                <div class="float-right text-center" :style="'width: 30%; height: 330px; padding-top: 55px; font-size: 24px; background-color: ' + widget_data.properties.result_background_color + '; color: ' + widget_data.properties.result_text_color + '; font-weight: bold;'">
                    <h3 style="line-height: 52px;">You Need</h3>
                    <h3 id="lr_you_need_reviews" style="line-height: 52px;">{{ widget_data.properties.you_need_reviews }}</h3>
                    <h3 style="line-height: 52px;">More 5 Star<br /> Reviews</h3>
                </div>

                <div class="clearfix"></div>
            </v-card>
        </div>

        <div v-if="widget_data.type == 'customer-retention-calculator'">
            <v-card>
                <div class="float-left" style="width: 70%; height: 350px; color: #7F7F7F;">
                    <div style="padding: 20px;">
                        <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Negative reviews per year</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.negative_reviews_per_year"
                            @change="widget_data.properties.calculated_revenue = calculatedRevenue();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="1"
                            max="100"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">% of complaints resolved via review response</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.percentage_of_complaints"
                            @change="widget_data.properties.calculated_revenue = calculatedRevenue();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="1"
                            max="100"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Customer lifetime value ($)</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.customer_lifetime_value"
                            @change="widget_data.properties.calculated_revenue = calculatedRevenue();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="50"
                            max="100000"
                            hide-details
                        ></v-slider>
                    </div>
                </div>
                <div class="float-right text-center" :style="'width: 30%; height: 350px; padding-top: 100px; font-size: 24px; background-color: ' + widget_data.properties.result_background_color + '; color: ' + widget_data.properties.result_text_color + '; font-weight: bold;'">
                    <h3 style="line-height: 52px;">Revenue</h3>
                    <h3 id="lr_calculated_revenue" style="line-height: 52px;">{{ widget_data.properties.calculated_revenue }}</h3>
                    <!-- <h3>&nbsp;</h3> -->
                </div>

                <div class="clearfix"></div>
            </v-card>
        </div>

        <div v-if="widget_data.type == 'reputation-revenue-calculator'">
            <v-card>
                <div class="float-left" style="width: 70%; height: 430px; color: #7F7F7F;">
                    <div style="padding: 20px;">
                        <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Number of Local Business Clients</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.number_of_local_business_clients"
                            @change="calculateDdrMrrArr();"
                            :thumb-size="50"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0"
                            max="999"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Average Monthly Fee</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.average_monthly_fee"
                            @change="calculateDdrMrrArr();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0"
                            max="999"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">% of Clients that Purchase Upsell</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.percentage_of_clients_upsell"
                            @change="calculateDdrMrrArr();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0"
                            max="100"
                            hide-details
                        ></v-slider>

                        <v-subheader class="pl-0 mb-6">
                            <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget_data.properties.titles_color">Upsell Fee</span>
                        </v-subheader>
                        <v-slider
                            v-model="widget_data.properties.upsell_monthly_revenue"
                            @change="calculateDdrMrrArr();"
                            :thumb-size="36"
                            thumb-label="always"
                            :color="widget_data.properties.sliders_color"
                            track-color="blue-grey lighten-4"
                            :track-fill-color="widget_data.properties.sliders_color"
                            min="0"
                            max="999"
                            hide-details
                        ></v-slider>
                    </div>
                </div>
                <div class="float-right text-center" :style="'width: 30%; height: 430px; padding-top: 55px; font-size: 24px; background-color: ' + widget_data.properties.result_background_color + '; color: ' + widget_data.properties.result_text_color + '; font-weight: bold;'">
                    <h3 style="line-height: 52px;">Daily (DDR)</h3>
                    <h3 id="lr_calculated_ddr" style="line-height: 52px;">{{ widget_data.properties.calculated_ddr }}</h3>

                    <h3 style="line-height: 52px;">Monthly (MRR)</h3>
                    <h3 id="lr_calculated_mrr" style="line-height: 52px;">{{ widget_data.properties.calculated_mrr }}</h3>

                    <h3 style="line-height: 52px;">Annualy (ARR)</h3>
                    <h3 id="lr_calculated_arr" style="line-height: 52px;">{{ widget_data.properties.calculated_arr }}</h3>
                    <!-- <h3>&nbsp;</h3> -->
                </div>

                <div class="clearfix"></div>
            </v-card>
        </div>
    </div>
</template>

<script>
import { GetSuggestions } from '@/utils/PlaceUtils'
// import { GetPlaceDetails } from '@/utils/PlaceUtils'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery'

export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        widget_data: false,
        scroll_working: false,
        current_visible: 0,
        show_rating: false,
        reviews_start: 0,
        finishedLoadingReviews: false,

        company_name: "",

        autocompleteLocationModel: null,
        locationSearchText: null,
        locationEntries: [],

        business_location: {}
      }
    },
    computed: {
        visibleReviews () {
            return this.widget_data.reviews.filter(p=>p.isActive).length
        },
        locationFoundItems () {
            return this.locationEntries
        }
    },
    methods: {
        showDialog: function() {
            let self = this
            this.dialog = true
            setTimeout(function() {
                self.show_rating = true
            }, 100);

            parent.postMessage("showReviews","*");  //  `*` on any domain  
        },
        closeDialog: function() {
            this.dialog = false, this.show_rating = false, parent.postMessage('closeReviews','*')
        },
        getWidgetData: async function() {
            let self = this
            try {
                let url = process.env.VUE_APP_API_ENDPOINT + '/widgets/get-data/' + this.$route.params.token;

                // Preview
                let exploded = window.location.href.split("?fw");
                if (exploded.length > 1) {
                    url = url + "?fw=" + exploded[1];
                }
                
                let response = await axios.get(url, {

                } , {
                    headers: {
                        'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                    },
                })
                
                this.widget_data = response.data.widget_data

                console.log(this.widget_data);

                setTimeout(function() {
                    let els = document.querySelectorAll('*[contenteditable="true"]');
                    
                    for (var i in els) {
                        let el = els[i];

                        try {
                            el.removeAttribute("contenteditable");
                        }
                        catch(e) {}
                    }

                    let businessNameEl = document.querySelector('#business_name');
                    let websiteUrlEl = document.querySelector('#website_url');

                    let new_height = document.querySelector(".lr-widget-wrapper").offsetHeight + 60;

                    parent.postMessage({
                        event_id: 'resizeWidgetIframe_' + self.widget_data.id,
                        data: {
                            new_height: new_height
                        }
                    },"*");  //  `*` on any domain

                    if (self.widget_data.type == "default" || self.widget_data.type == "seo-audit") {
                        if (businessNameEl) {
                            let placeholder = businessNameEl.value;
                            let content = document.querySelector('.v-input');
                            let body = document.querySelector('.lr-input');
                            content.parentNode.removeChild(content);
                            body.innerHTML = '';
                            body.appendChild(content);
                            
                            document.querySelector(".lr-input input").setAttribute("placeholder", placeholder);
                        }

                        if (websiteUrlEl) {
                            let placeholder = websiteUrlEl.value;
                            websiteUrlEl.value = '';
                            websiteUrlEl.placeholder = 'placeholder';
                            
                            document.querySelector(".lr-input input").setAttribute("placeholder", placeholder);
                        }

                        $(".lr-button").click(function() {
                            self.submit();
                        });
                    }
                    else {
                        self.calculateDdrMrrArr();
                    }
                }, 100);

            }catch(e){
                console.log(e)
            }
        },
        async submit() {
            let self = this;

            if (document.querySelector("#website_url")) {
                await this.submitSEOAudit();
                return;
            }

            if (!self.company_name) return;

            $(".lr-input input").prop('disabled', true);

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/save-search', {
                company_name: self.company_name,
                widget_uuid: self.widget_data.uuid,
                place_id: self.autocompleteLocationModel.id,
                properties: self.business_location
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id;
        },
        async submitSEOAudit() {
            let self = this;

            console.log('submitting SEO Audit...')
            let website_url = document.querySelector("#website_url").value;

            website_url = website_url.replace("http://", "");
            website_url = website_url.replace("https://", "");
            // website_url = website_url.replace("www.", "");

            if (!website_url) {
                document.querySelector("#website_url").focus();
                return;
            }

            if (!this.validateDomain(website_url)) {
                document.querySelector("#website_url").focus();
                return;
            }

            let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/submit-seo-audit', {
                widget_uuid: self.widget_data.uuid,
                website_url: website_url
            } , {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            });

            parent.window.location = window.location.origin + '/rf?s=' + response.data.widget_uuid + '&p=' + response.data.place_id;
        },
        getHostname: function(item) {
            return new URL(item.listing.url).hostname.replace("www.", "");
        },
        formatDate: function(date) {
            return moment(String(date)).format('MM/DD/YYYY')
        },
        validateDomain(domain) {
            domain = domain.replace("www.", "");
            if (/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain))
                return true;

            return false;
        },
        onScroll: function(e) {
            
        },
        getAddressObject(address_components) {
        var ShouldBeComponent = {
            street_number: ["street_number"],
            zip: ["postal_code"],
            address: ["street_address", "route"],
            state: [
            "administrative_area_level_1",
            "administrative_area_level_2",
            "administrative_area_level_3",
            "administrative_area_level_4",
            "administrative_area_level_5"
            ],
            city: [
            "locality",
            "sublocality",
            "sublocality_level_1",
            "sublocality_level_2",
            "sublocality_level_3",
            "sublocality_level_4"
            ],
            country: ["country"]
        };

        var address = {
            street_number: "",
            zip: "",
            address: "",
            state: "",
            city: "",
            country: ""
        };
        address_components.forEach(component => {
            for (var shouldBe in ShouldBeComponent) {
            if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
                if (shouldBe === "country") {
                address[shouldBe] = component.short_name;
                } else {
                address[shouldBe] = component.long_name;
                }
            }
            }
        });
        return address;
        },
        filterPlaces (item, queryText, itemText) {
        return true
        },
        async selectPlace() {
            let that = this


            /*!!!!! TODO replace this with the backend API get-place-details to retrieve more data TODO *****/

            let response = await axios.get(process.env.VUE_APP_API_ENDPOINT + '/local-recon/get-place-details?place_id=' + that.autocompleteLocationModel.id, {
                headers: {
                    'Authorization': 'Bearer ' + this.$store.state.auth.jwt
                },
            })

            // console.log(response.data.result);

            that.company_name = response.data.result.name;
            that.business_location = response.data.result
        },

        youNeedReviews() {
            console.log('run2')
            // Initial input, grab these from the user entered data
            let current_google_rating=parseFloat(this.widget_data.properties.current_google_rating);
            let current_number_of_google_reviews=parseFloat(this.widget_data.properties.current_number_of_google_reviews);
            let desired_google_rating=parseFloat(this.widget_data.properties.desired_google_rating);

            console.log(desired_google_rating)

            // Initialize new variables to be used for calculations
            let number_of_new_ratings = 0;
            let total_number_of_reviews = current_number_of_google_reviews;
            let this_rating = current_google_rating

            // keep increasing the rating until we get to the designer rating
            while (desired_google_rating > this_rating && number_of_new_ratings < 1001) {
                number_of_new_ratings++;
                total_number_of_reviews++;

                this_rating = ((current_number_of_google_reviews * current_google_rating) + (number_of_new_ratings * 5)) / total_number_of_reviews
            }

            console.log('number_of_new_ratings ===> ', number_of_new_ratings)

            // output the number of new ratings
            // console.log('You need ' + number_of_new_ratings + ' more reviews');

            try {
                if (number_of_new_ratings > 1000)
                    document.querySelector("#lr_you_need_reviews").innerHTML = "1000+";
                else
                    document.querySelector("#lr_you_need_reviews").innerHTML = number_of_new_ratings;
            }
            catch (e) {}

            return number_of_new_ratings;
        },

        calculatedRevenue() {
            let revenue = (this.widget_data.properties.negative_reviews_per_year * this.widget_data.properties.percentage_of_complaints) * (this.widget_data.properties.customer_lifetime_value/100);
            revenue = Math.ceil(revenue);

            revenue = '$' + revenue;
            
            try {
                document.querySelector("#lr_calculated_revenue").innerHTML = revenue;
            }
            catch (e) {}

            return revenue;
        },

        calculateDdrMrrArr() {
            let self = this;

            let ddr = 0;
            let mrr = 0;
            let arr = 0;

            let upsell_clients_nr = (this.widget_data.properties.percentage_of_clients_upsell/100) * this.widget_data.properties.number_of_local_business_clients;

            mrr = (this.widget_data.properties.number_of_local_business_clients * this.widget_data.properties.average_monthly_fee) +
                (upsell_clients_nr * this.widget_data.properties.upsell_monthly_revenue);

            mrr = Math.ceil(mrr);
            ddr = Math.ceil((mrr * 12)/366);
            arr = Math.ceil(mrr * 12);

            try {
                setTimeout(function() {
                    document.querySelector("#lr_calculated_ddr").innerHTML = '$' + self.numberWithCommas(ddr);
                    document.querySelector("#lr_calculated_mrr").innerHTML = '$' + self.numberWithCommas(mrr);
                    document.querySelector("#lr_calculated_arr").innerHTML = '$' + self.numberWithCommas(arr);
                }, 1);
            }
            catch (e) {}
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
    },
    created() {
        this.getWidgetData();
    },
    watch: {
        locationSearchText (newVal) {
        var that = this;

        // If less than 3 chars typed, do not search
        if (!newVal || newVal.length <= 3) return

        // Call the method from the previous section here
        GetSuggestions(newVal)
            .then(function (res) {
            that.locationEntries = res;
            })
            .catch(function () {
            that.business = false;
            that.step = 1;
            })
        }
    }
}
</script>

<style type="text/css">
    body, html, .theme--light.v-application {
        background: none transparent;
    }

    .widgets-wrapper {
        position: absolute;
        bottom: 10px;
    }

    .lr-input input {
        height: 42px;
        line-height: 42px;
        max-height: 42px;
        margin-right: -29px;
    }

    .lr-input .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
        display: none;
    }

    .lr-input .theme--light.v-text-field > .v-input__control > .v-input__slot:after {
        display: none;
    }

    #lr-widget-html, #lr-widget-seo-html {
        margin-top: 15px;
        margin-bottom: 15px;
    }

    .v-card.v-sheet.theme--light {
        border-color: rgba(0, 0, 0, 0.14);
    }
</style>