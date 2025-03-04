<template>

  <panel-navigation>

    <div v-if="showHelpRequestModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
        <div class="w-full sm:w-1/2 lg:w-3/5 bg-white rounded-lg mx-6">

        <div class="p-6">

            <h2 class="text-lg font-semibold text-gray-800 mb-3">Help Request Settings</h2>

            <hr class="border-b border-gray-100 mb-4">

            <div class="float-left pt-1" style="width: 40%;">
                <br /><br /><br />

                <v-expansion-panels accordion>
                    <v-expansion-panel>
                        <v-expansion-panel-header>First Name</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                v-model="widget.properties.action_options.first_name_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                v-model="widget.properties.action_options.first_name_mandatory"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.action_options.first_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Last Name</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                v-model="widget.properties.action_options.last_name_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                v-model="widget.properties.action_options.last_name_mandatory"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.action_options.last_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Email</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                disabled
                                v-model="help_request_email_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                disabled
                                v-model="help_request_email_required"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.action_options.email_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Button</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.action_options.button_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.action_options.button_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Spam</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-switch class="pt-1"
                                v-model="widget.properties.action_options.spam_disclaimer_visible"
                                label="Visible"
                            ></v-switch>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <div class="float-right" style="width: 55%;">
                <div style="text-align: center;" class="mb-4">
                    <h2 class="pt-2" style="font-weight: bold;"><Editable v-model="widget.properties.action_options.header_text_top_fixing_listing" /></h2>
                    <h3 class="pt-2"><Editable v-model="widget.properties.action_options.header_text_bottom_fixing_listing" /></h3>
                </div>

                <div v-if="widget.properties.action_options.first_name_visible" class="mb-2">
                    <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.first_placeholder_text">
                </div>

                <div v-if="widget.properties.action_options.last_name_visible" class="mb-2">
                    <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.last_placeholder_text">
                </div>

                <div class="mb-2">
                    <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.action_options.email_placeholder_text">
                </div>

                <div class="mb-2">
                    <input name="company_name" ref="company_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Name...'">
                </div>

                <div class="mb-2">
                    <input name="company_address" ref="company_address" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="'Company Address...'">
                </div>

                <div class="flex flex-wrap">
                    <div class="w-full md:w-1/3 pr-3 mb-6 md:mb-0">
                        <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-first-name" type="text" ref="city" placeholder="City...">
                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6">
                        <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="state" placeholder="State...">
                    </div>
                    <div class="w-full md:w-1/3 pl-3 mb-6">
                        <input class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" id="grid-last-name" type="text" ref="zip" placeholder="Zip...">
                    </div>
                </div>

                <div style="text-align: center;" class="">
                    <div class="text-white inline-block rounded py-3 px-5 cursor-pointer" v-bind:style="{ backgroundColor: widget.properties.action_options.button_color }"><Editable v-model="widget.properties.action_options.submit_button_text" /></div>

                    <div v-if="widget.properties.action_options.spam_disclaimer_visible" class="text-xs text-gray-700 mt-5">
                        <i class="fa fa-lock"></i> &nbsp;<Editable v-model="widget.properties.action_options.spam_disclaimer_text" />
                    </div>
                </div>
            </div>

            <div style="clear: both;"></div>

            <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

        </div>

        <div class="bg-gray-100 rounded-b-lg px-6 py-4">

            <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showHelpRequestModal = false">
                Close
            </button>

        </div>



        </div>
    </div>

    <div v-if="showRedirectUrlModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
        <div class="w-full sm:w-1/2 lg:w-3/5 bg-white rounded-lg mx-6">

        <div class="p-6">

            <h2 class="text-lg font-semibold text-gray-800 mb-3">Redirect</h2>

            <hr class="border-b border-gray-100 mb-4">

            <v-text-field
                label="Enter Redirect URL"
                hide-details="auto"
                v-model="widget.properties.action_options.redirect_link_url"
            ></v-text-field>

            <div style="clear: both;"></div>

            <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

        </div>

        <div class="bg-gray-100 rounded-b-lg px-6 py-4">

            <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showRedirectUrlModal = false">
                Close
            </button>

        </div>



        </div>
    </div>

    <div v-if="showOptinModal" class="fixed top-0 left-0 h-full w-full flex flex-column items-center justify-center" style="background-color: rgba(0,0,0,.2); z-index: 8;">
        <div class="w-full sm:w-1/2 lg:w-3/5 bg-white rounded-lg mx-6">

        <div class="p-6">

            <h2 class="text-lg font-semibold text-gray-800 mb-3">Optin Settings</h2>

            <hr class="border-b border-gray-100 mb-4">

            <div class="float-left pt-1" style="width: 40%;">
                <v-expansion-panels accordion>
                    <v-expansion-panel>
                        <v-expansion-panel-header>Headline</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.show_headline"
                                label="Visible"
                            ></v-switch>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>First Name</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.first_name_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.first_name_mandatory"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.view_gate.first_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Last Name</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.last_name_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.last_name_mandatory"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.view_gate.last_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Email</v-expansion-panel-header>
                        <v-expansion-panel-content>
                        
                            <v-switch class="pt-1"
                                disabled
                                v-model="help_request_email_visible"
                                label="Visible"
                            ></v-switch>

                            <v-switch class="pt-1"
                                disabled
                                v-model="help_request_email_required"
                                label="Required"
                            ></v-switch>

                            <v-text-field
                                label="Placeholder Text"
                                hide-details="auto"
                                v-model="widget.properties.view_gate.email_placeholder_text"
                            ></v-text-field>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Button</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.view_gate.submit_button_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.view_gate.submit_button_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Spam</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.show_spam_disclaimer"
                                label="Visible"
                            ></v-switch>
                        </v-expansion-panel-content>
                    </v-expansion-panel>

                    <v-expansion-panel class="mt-1">
                        <v-expansion-panel-header>Name</v-expansion-panel-header>
                        <v-expansion-panel-content>
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.first_last_one_line"
                                label="On one line"
                            ></v-switch>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>

            <div class="float-right" style="width: 55%;">
                <div style="text-align: center;" class="mb-4" v-if="widget.properties.view_gate.show_headline == true">
                    <h3 class="pt-2"><Editable v-model="widget.properties.view_gate.headline_text" /></h3>
                </div>

                <div class="flex flex-wrap">
                    <div v-if="widget.properties.view_gate.first_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.last_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 pr-3 mb-3 md:mb-0')">
                        <input name="first_name" ref="first_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.first_placeholder_text">
                    </div>
                    <div v-if="widget.properties.view_gate.last_name_visible" :class="((!widget.properties.view_gate.first_last_one_line || !widget.properties.view_gate.first_name_visible) ? 'w-full mb-3 md:mb-0' : 'w-full md:w-1/2 md:mb-0')">
                        <input name="last_name" ref="last_name" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.last_placeholder_text">
                    </div>
                </div>

                <div class="mb-2">
                    <input name="email" ref="email" class="block appearance-none focus:outline-none focus:border-gray-500 w-full bg-white border-2 border-grey-light hover:border-grey px-2 py-2 rounded" type="text" :placeholder="widget.properties.view_gate.email_placeholder_text">
                </div>

                <div style="text-align: center;" class="">
                    <div class="text-white inline-block rounded py-3 px-5 cursor-pointer" v-bind:style="{ backgroundColor: widget.properties.view_gate.submit_button_color }"><Editable v-model="widget.properties.view_gate.submit_button_text" /></div>

                    <div v-if="widget.properties.view_gate.show_spam_disclaimer" class="text-xs text-gray-700 mt-5">
                        <i class="fa fa-lock"></i> &nbsp;<Editable v-model="widget.properties.view_gate.spam_disclaimer_text" />
                    </div>
                </div>
            </div>

            <div style="clear: both;"></div>

            <!-- <p class="text-xs text-gray-700 mb-4">Your contact's phone number.</p> -->

        </div>

        <div class="bg-gray-100 rounded-b-lg px-6 py-4">

            <button class="rounded hover:bg-gray-200 text-gray-800 border border-gray-800 focus:outline-none py-2 px-4 mr-2" @click="showOptinModal = false">
                Close
            </button>

        </div>



        </div>
    </div>

    <h1 class="text-lg font-semibold mb-4">Create Widget</h1>

    <hr class="border-b border-gray-100 mb-3">

	<v-skeleton-loader v-if="!widgetLoaded && !$route.params.action" type="article, article, article, article, article"></v-skeleton-loader>

    <div v-if="widgetLoaded || $route.params.action" class="flex flex-row flex-wrap -mx-3">

      <div class="w-full sm:w-1/3 mb-4 px-3">
        <v-text-field
	      label="Widget Name"
	      hide-details="true"
		  v-model="widget.name"
	    ></v-text-field>

    	<hr class="border-b border-gray-100 mb-3">

	    <v-tabs>
		    <v-tab>Settings</v-tab>
		    <v-tab>Embed Code</v-tab>
	        
	        <v-tab-item>
	          	<div class="bg-gray-100 rounded p-4" v-if="widgetLoaded">
	          		<label>Type</label>

		          	<v-radio-group
				      class="mt-2"
				      row
					  v-model="widget.type"
				    >
				      <v-radio
				        label="Reputation Report"
				        value="default"
				      ></v-radio>
				      <v-radio
				        label="SEO Audit"
				        value="seo-audit"
				      ></v-radio>
				      <v-radio @click="calculateDdrMrrArr_delayed();"
				        label="Reputation Revenue Calculator"
				        value="reputation-revenue-calculator"
				      ></v-radio>
				      <v-radio @click="calculatedRevenue_delayed();"
				        label="Customer Retention Calculator"
				        value="customer-retention-calculator"
				      ></v-radio>
				      <v-radio @click="youNeedReviews_delayed();"
				        label="Star Rating Calculator"
				        value="star-rating-calculator"
				      ></v-radio>
				    </v-radio-group>
	          		
                    <div v-show="widget.type == 'default' || widget.type == 'seo-audit'">
                        <div class="float-right">
                            <label>Optin</label>
                            <v-switch class="pt-1"
                                v-model="widget.properties.view_gate.visible"
                                @click="showOptinModal = widget.properties.view_gate.visible"
                            ></v-switch>
                        </div>
                        
                        <label>Action</label>

                        <v-radio-group
                        class="mt-2"
                        row
                        v-model="widget.properties.action_options.landing_page_action_type_id"
                        >
                        <v-radio
                            label="Help Request"
                            value="1"
                            @click="showHelpRequestModal = true"
                        ></v-radio>
                        <v-radio
                            label="Redirect"
                            value="2"
                            @click="showRedirectUrlModal = true"
                        ></v-radio>
                        </v-radio-group>

                        <div class="float-left has-color-picker-lr pr-4">
                            <label style="font-size: 13px;">Title Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.main.title_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.main.title_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr">
                            <label style="font-size: 13px;">Box Border Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.main.border_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.main.border_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr pr-4 pt-1">
                            <label style="font-size: 13px;">Button Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.main.button_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.main.button_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr pt-1">
                            <label style="font-size: 13px;">Button Text Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.main.button_text_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.main.button_text_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>
                    </div>

                    <div v-show="widget.type != 'default' && widget.type != 'seo-audit'">
                        <div class="float-left has-color-picker-lr pr-4 mb-1">
                            <label style="font-size: 13px;">Titles Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.titles_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.titles_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr pr-4 mb-1">
                            <label style="font-size: 13px;">Sliders Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.sliders_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.sliders_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr pr-4 mb-1">
                            <label style="font-size: 13px;">Result Background Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.result_background_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.result_background_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>


                        <div class="float-left has-color-picker-lr mb-1">
                            <label style="font-size: 13px;">Result Text Color</label>
                            <br />

                            <v-menu offset-y :close-on-content-click="false">
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    :color="widget.properties.result_text_color"
                                    dark
                                    v-on="on"
                                >
                                </v-btn>
                                </template>
                                <v-color-picker
                                v-model="widget.properties.result_text_color"
                                mode="hexa"
                                class="mx-auto"
                                style="width: 200px"
                                ></v-color-picker>
                            </v-menu>
                        </div>
                    </div>

			        <br clear="all" /><br clear="all" />
		        </div>

				<br />

				<v-btn
					class="ma-2"
					color="success"
					@click="saveWidget()"
				>
					Save Widget
					<template v-slot:loader>
						<span class="custom-loader">
							<v-icon light>mdi-cached</v-icon>
						</span>
					</template>
				</v-btn>

				<v-chip
					v-if="saved"
					class="ma-2"
					color="green"
					outlined
					@click="saved = false"
				>
					<v-icon left>
						mdi-check
					</v-icon>
					Saved
				</v-chip>
	        </v-tab-item>
	        
	        <v-tab-item>
				<br />
				<p>Copy and paste the following code snippet into your website, before the end of the &lt;body&gt; tag.</p>

	        	<div class="bg-gray-100 rounded p-1">
	          		<div class="tab-pane-content p-2">
						<div class="card card-code" style="word-break: break-all; padding: 10px; font-size: 12px;">
							&lt;script src="{{ getEmbedCode() }}" type="text/javascript"&gt;&lt;/script&gt;
						</div>
					</div>
	          	</div>

				  <br />

				<v-btn 
					v-clipboard:copy="message"
					v-clipboard:success="onCopy"
					v-clipboard:error="onError"

					depressed
      				color="primary"
				>
					Copy Code
				</v-btn>

	        </v-tab-item>
        
		</v-tabs>
      </div>

      <div class="w-full sm:w-2/3 mb-4 px-3">
        <div class="mb-4">
          <h2 class="font-bold text-gray-800">Preview</h2>
        </div>
        <div class="w-full">
            <div v-if="widget.type == 'default'">
          	    <div id="lr-widget-html" v-html="widget.properties.html"></div>
            </div>

            <div v-if="widget.type == 'seo-audit'">
                <div id="lr-widget-seo-html" v-html="widget.properties.seo_audit_html"></div>
            </div>

            <div v-if="widget.type == 'star-rating-calculator'">
                <v-card>
                    <div class="float-left" style="width: 70%; height: 330px; color: #7F7F7F;">
                        <div style="padding: 20px;">
                            <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Current Google Rating</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.current_google_rating"
                                @change="widget.properties.you_need_reviews = youNeedReviews();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0.1"
                                step="0.1"
                                max="5"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Current number of Google reviews</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.current_number_of_google_reviews"
                                @change="widget.properties.you_need_reviews = youNeedReviews();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="1"
                                max="100"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Desired Google rating</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.desired_google_rating"
                                @change="widget.properties.you_need_reviews = youNeedReviews();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0.1"
                                step="0.1"
                                max="5"
                                hide-details
                            ></v-slider>
                        </div>
                    </div>
                    <div class="float-right text-center" :style="'width: 30%; height: 330px; padding-top: 55px; font-size: 24px; background-color: ' + widget.properties.result_background_color + '; color: ' + widget.properties.result_text_color + '; font-weight: bold;'">
                        <h3 style="line-height: 52px;">You Need</h3>
                        <h3 id="lr_you_need_reviews" style="line-height: 52px;">{{ widget.properties.you_need_reviews }}</h3>
                        <h3 style="line-height: 52px;">More 5 Star <br />Reviews</h3>
                    </div>

                    <div class="clearfix"></div>
                </v-card>
            </div>

            <div v-if="widget.type == 'customer-retention-calculator'">
                <v-card>
                    <div class="float-left" style="width: 70%; height: 350px; color: #7F7F7F;">
                        <div style="padding: 20px;">
                            <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Negative reviews per year</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.negative_reviews_per_year"
                                @change="widget.properties.calculated_revenue = calculatedRevenue();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="1"
                                max="100"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">% of complaints resolved via review response</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.percentage_of_complaints"
                                @change="widget.properties.calculated_revenue = calculatedRevenue();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="1"
                                max="100"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-11">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Customer lifetime value ($)</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.customer_lifetime_value"
                                @change="widget.properties.calculated_revenue = calculatedRevenue();"
                                :thumb-size="50"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="50"
                                max="100000"
                                hide-details
                            ></v-slider>
                        </div>
                    </div>
                    <div class="float-right text-center" :style="'width: 30%; height: 350px; padding-top: 100px; font-size: 24px; background-color: ' + widget.properties.result_background_color + '; color: ' + widget.properties.result_text_color + '; font-weight: bold;'">
                        <h3 style="line-height: 52px;">Revenue</h3>
                        <h3 id="lr_calculated_revenue" style="line-height: 52px;">{{ widget.properties.calculated_revenue }}</h3>
                        <!-- <h3>&nbsp;</h3> -->
                    </div>

                    <div class="clearfix"></div>
                </v-card>
            </div>

            <div v-if="widget.type == 'reputation-revenue-calculator'">
                <v-card>
                    <div class="float-left" style="width: 70%; height: 430px; color: #7F7F7F;">
                        <div style="padding: 20px;">
                            <v-subheader class="pl-0 mb-2 -mt-4 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Number of Local Business Clients</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.number_of_local_business_clients"
                                @change="calculateDdrMrrArr();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0"
                                max="999"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Average Monthly Fee</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.average_monthly_fee"
                                @change="calculateDdrMrrArr();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0"
                                max="999"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">% of Clients that Purchase Upsell</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.percentage_of_clients_upsell"
                                @change="calculateDdrMrrArr();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0"
                                max="100"
                                hide-details
                            ></v-slider>

                            <v-subheader class="pl-0 mb-6">
                                <span :style="'font-size: 15px; padding-left: 10px; color: ' + widget.properties.titles_color">Upsell Fee</span>
                            </v-subheader>
                            <v-slider
                                v-model="widget.properties.upsell_monthly_revenue"
                                @change="calculateDdrMrrArr();"
                                :thumb-size="36"
                                thumb-label="always"
                                :color="widget.properties.sliders_color"
                                track-color="blue-grey lighten-4"
                                :track-fill-color="widget.properties.sliders_color"
                                min="0"
                                max="999"
                                hide-details
                            ></v-slider>
                        </div>
                    </div>
                    <div class="float-right text-center" :style="'width: 30%; height: 430px; padding-top: 55px; font-size: 24px; background-color: ' + widget.properties.result_background_color + '; color: ' + widget.properties.result_text_color + '; font-weight: bold;'">
                        <h3 style="line-height: 52px;">Daily (DDR)</h3>
                        <h3 id="lr_calculated_ddr" style="line-height: 52px;">{{ widget.properties.calculated_ddr }}</h3>

                        <h3 style="line-height: 52px;">Monthly (MRR)</h3>
                        <h3 id="lr_calculated_mrr" style="line-height: 52px;">{{ widget.properties.calculated_mrr }}</h3>

                        <h3 style="line-height: 52px;">Annualy (ARR)</h3>
                        <h3 id="lr_calculated_arr" style="line-height: 52px;">{{ widget.properties.calculated_arr }}</h3>
                        <!-- <h3>&nbsp;</h3> -->
                    </div>

                    <div class="clearfix"></div>
                </v-card>
            </div>
        </div>

      </div>

    </div>

    <!--<div>
      <button class="bg-gray-200 py-2 px-3 text-gray-600 hover:bg-gray-300 rounded" @click="$refs.dialogPlatform.show()"><font-awesome-icon icon="plus-circle" class="mr-1"></font-awesome-icon> Add platform</button>
    </div>-->
  </panel-navigation>

</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import urlParser from 'url-parse'
import PanelNavigation from '@/components/PanelNavigation.vue'
import Editable from '@/components/common/Editable';

export default {
  metaInfo () {
    return {
      title: "Widgets Edit | " + this.$appName
    }
  },
  components: {
    PanelNavigation,
    Editable
  },
  data () {
    return {
      saved: false,
      help_request_email_visible: true,
      help_request_email_required: true,
	  widgetLoaded: false,
      showHelpRequestModal: false,
      showRedirectUrlModal: false,
      showOptinModal: false,
	  message: '<script src="' + this.getEmbedCode() + '" type="text/javascript"><\/script>',
	  preview_url: "",
      widget: {
		name: "",
      	properties: {
      	}
      },
    }
  },
  computed: {
    ...mapState({
      listings: state => state.listings.listings,
      fetchingListings: state => state.listings.fetchingListings,
      me: state => state.me.me
    })
  },
  methods: {
	onCopy: function (e) {
		this.$swal({
			title: "Copied",
			text: "Embed code copied successfully!",
			showCancelButton: false,
			});
	},
	onError: function (e) {
		alert('Failed to copy the text to the clipboard')
		console.log(e);
	},
    getHostname(url) {
      return urlParser(url).hostname.replace("www.", "")
    },
    getPathname(url) {
      return urlParser(url).pathname
    },
    getIconUrl(url) {

      return require('@/assets/images/review-services/www.' + this.getHostname(url) + ".png");

    },
	getWidget: async function() {
		try {
			let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/get-widget/' + this.$route.params.token, {

			} , {
			headers: {
				'Authorization': 'Bearer ' + this.$store.state.auth.jwt
			},
			})
			
			this.widget = response.data.widget

            if (!this.widget.properties.current_google_rating)
                this.widget.properties.current_google_rating = 1;

            if (!this.widget.properties.current_number_of_google_reviews)
                this.widget.properties.current_number_of_google_reviews = 15;

            if (!this.widget.properties.desired_google_rating)
                this.widget.properties.desired_google_rating = 1;

            if (!this.widget.properties.negative_reviews_per_year)
                this.widget.properties.negative_reviews_per_year = 10;

            if (!this.widget.properties.percentage_of_complaints)
                this.widget.properties.percentage_of_complaints = 5;

            if (!this.widget.properties.customer_lifetime_value)
                this.widget.properties.customer_lifetime_value = 10000;

            if (!this.widget.properties.number_of_local_business_clients)
                this.widget.properties.number_of_local_business_clients = 30;

            if (!this.widget.properties.average_monthly_fee)
                this.widget.properties.average_monthly_fee = 250;

            if (!this.widget.properties.percentage_of_clients_upsell)
                this.widget.properties.percentage_of_clients_upsell = 35;

            if (!this.widget.properties.upsell_monthly_revenue)
                this.widget.properties.upsell_monthly_revenue = 350;

            if (!this.widget.properties.titles_color)
                this.widget.properties.titles_color = "#7F7F7F";
            
            if (!this.widget.properties.sliders_color)
                this.widget.properties.sliders_color = "#EC407A";
            
            if (!this.widget.properties.result_background_color)
                this.widget.properties.result_background_color = "#2A73FF";
            
            if (!this.widget.properties.result_text_color)
                this.widget.properties.result_text_color = "#FFFFFF";
            
            this.widget.properties.you_need_reviews = this.youNeedReviews();

            this.widget.properties.calculated_revenue = this.calculatedRevenue();

            this.calculateDdrMrrArr();

            // alert(this.widget.properties.calculated_revenue);

			this.widgetLoaded = true
			console.log(this.widget)
		}catch(e){
			console.log(e)
		}
	},
    youNeedReviews_delayed() {
        let self = this;
        setTimeout(function() {
            self.youNeedReviews();
        }, 30);
    },
    youNeedReviews() {
        console.log('run2')
        // Initial input, grab these from the user entered data
        let current_google_rating=parseFloat(this.widget.properties.current_google_rating);
        let current_number_of_google_reviews=parseFloat(this.widget.properties.current_number_of_google_reviews);
        let desired_google_rating=parseFloat(this.widget.properties.desired_google_rating);

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
    calculatedRevenue_delayed() {
        let self = this;
        setTimeout(function() {
            self.calculatedRevenue();
        }, 30);
    },
    calculatedRevenue() {
        let revenue = (this.widget.properties.negative_reviews_per_year * this.widget.properties.percentage_of_complaints) * (this.widget.properties.customer_lifetime_value/100);
        revenue = Math.ceil(revenue);

        console.log('revenue', revenue)

        revenue = '$' + revenue;
        
        try {
            document.querySelector("#lr_calculated_revenue").innerHTML = this.numberWithCommas(revenue);
        }
        catch (e) {}

        return revenue;
    },
    calculateDdrMrrArr_delayed() {
        let self = this;
        setTimeout(function() {
            self.calculateDdrMrrArr();
        }, 30);
    },
    calculateDdrMrrArr() {
        let self = this;

        let ddr = 0;
        let mrr = 0;
        let arr = 0;

        let upsell_clients_nr = (this.widget.properties.percentage_of_clients_upsell/100) * this.widget.properties.number_of_local_business_clients;

        mrr = (this.widget.properties.number_of_local_business_clients * this.widget.properties.average_monthly_fee) +
            (upsell_clients_nr * this.widget.properties.upsell_monthly_revenue);

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
	getEmbedCode: function() {
		let self = this

		let url = ((process.env.NODE_ENV == 'development') ? "http://localhost:8000" : "https://" + window.location.host) + "/js/v1/embed.js?token=" + self.$route.params.token;

		// Dev
		if (process.env.NODE_ENV == 'development') {
			url = url + "&env=dev";
		}

		return url;
	},
	saveWidget: async function() {
		this.saved = true
		let self = this

        try {
            document.querySelector("#business_name").setAttribute("value", document.querySelector("#business_name").value);
            self.widget.properties.html = document.querySelector("#lr-widget-html").innerHTML;
        }
        catch (e) {}
            
        if (self.widget.type == 'seo-audit')
            self.widget.properties.seo_audit_html = document.querySelector("#lr-widget-seo-html").innerHTML;

		try {
			let response = await axios.post(process.env.VUE_APP_API_ENDPOINT + '/local-recon/widgets/update-widget/' + this.$route.params.token, {
				widget: self.widget
			} , {
			headers: {
					'Authorization': 'Bearer ' + this.$store.state.auth.jwt
				},
			})

			setTimeout(function() {
				self.saved = false
			}, 2000)
		}catch(e){
			console.log(e)
		}
	},
	updatePreview: function() {
		if (document.getElementById('preview_iframe')) {
			let widget_stringified = JSON.stringify(this.widget);
			let widget_encoded = btoa(widget_stringified);
			let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded;

			document.getElementById('preview_iframe').src = new_preview_url;
		}
	},
	previewUrl() {
		let widget_stringified = JSON.stringify(this.widget);
		let widget_encoded = btoa(widget_stringified);
		let new_preview_url = '/widgets/preview/' + this.$route.params.token + "?fw=" + widget_encoded + "&url=" + encodeURIComponent(this.preview_url);
	
		window.open(new_preview_url)
	}
  },
  created() {
    this.$store.state.listings.fetchingListings = true
    this.$store.dispatch('listings/fetch', { dashboard: false })
    this.getWidget()

	if (this.$route.params.action) {
		setTimeout(function() {
			document.querySelectorAll('.v-tabs div[role="tab"]')[1].click()
		}, 20);
	}

	// let new_height = window.height - 200;
	// document.getElementById("preview_iframe").style.height = new_height + "px";
  },
	watch: {
		'widget.template': {
			handler() {
				this.updatePreview()
			}
		},
        'widget.properties.main.title_color': {
            handler() {
                try {
                    document.querySelector(".lr-title").style.color = this.widget.properties.main.title_color;
                }
                catch(e) {}
            }
        },
        'widget.properties.main.button_color': {
            handler() {
                try {
                    document.querySelector(".lr-banner-full .lr-button button").style.backgroundColor = this.widget.properties.main.button_color;
                }
                catch(e) {}
            }
        },
        'widget.properties.main.border_color': {
            handler() {
                try {
                    document.querySelector(".lr-banner-full").style.borderColor = this.widget.properties.main.border_color;
                }
                catch(e) {}
            }
        },
       'widget.properties.main.button_text_color': {
            handler() {
                try {
                    document.querySelector(".lr-banner-full .lr-button button").style.color = this.widget.properties.main.button_text_color;
                }
                catch(e) {}
            }
        },
       'widget.properties.titles_color': {
            handler() {
                console.log('titiles colors')
            }
        }
	}
}
</script>

<style scoped>
  input, select {
    border-style: solid;
  }

  .v-label, label {
  	/*font-size: 14px;*/
  }

  .has-color-picker-lr button {
  	width: 150px !important;
  }

  #preview_iframe {
	  width: 100%;
	  height: 650px;
	  border: solid 1px #CCCCCC;
  }

  .v-slider--horizontal .v-slider__track-container {
      height: 7px;
  }

  .v-input--radio-group.v-input--radio-group--row .v-radio {
      width: 100% !important;
  }

  .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label {
    padding-top: 7px;
  }

  div.v-slider__thumb-container span {
      font-size: 15px !important;
  }

</style>