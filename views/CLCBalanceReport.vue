<template>
    <div>
        <div class="services">
            <h3>CLC Balance Reports</h3>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <div v-if="message" class="message">
                {{ message }}
            </div>
            <div id="optToggs" class="row pt-3">
                <button @click="optTogg('rptSearchTog')" v-bind:class="{ 'mr-2 btn-sm btn-outline-info border-bottom-0': activeTog == 'rptSearchTog', 'mr-2 btn-sm btn-info': activeTog != 'rptSearchTog'}">
                    Search CLC Balance
                </button>
                <button @click="optTogg('clcDistTog')" v-bind:class="{ 'mr-2 btn-sm btn-outline-info border-bottom-0': activeTog == 'clcDistTog', 'mr-2 btn-sm btn-info': activeTog != 'clcDistTog'}">
                    CLC Balance Distribution
                </button>
                <button @click="optTogg('clcImportTog')" v-bind:class="{ 'mr-2 btn-sm btn-outline-info border-bottom-0': activeTog == 'clcImportTog', 'mr-2 btn-sm btn-info': activeTog != 'clcImportTog'}">
                    <a href="/app/">Import CLC Balance Data</a>
                </button>
            </div>
            <div id="optTogContent" v-bind:class="{ 'row pt-3 pb-3 border-info border col-md-12': activeTog != false}">
                    <div v-if="activeTog === 'clcDistTog'" id="clcDistribution">
                        <div class="alert-info" v-if="bdmLoading">Loading... </div>
                        <div v-bind:class="{ 'alert-success': clcDistRespMsg.status == 'success', 'alert-error': clcDistRespMsg.status == 'error' }" v-if="clcDistRespMsg.show">{{ clcDistRespMsg.message }}</div>
                        <div v-show="clcDistFormShow">
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputClcDistBdms">Email reports to:<br />
                                <select id="inputClcDistBdms" multiple v-model="clcDistBdms">
                                    <option v-for="item in bdmList" v-bind:value="item.cec_user_id">
                                        {{ item.fullname }}
                                    </option>
                                </select>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputMinBal">Minimum balance:<br />
                                    <input type="text" id="inputMinBal" v-model="clcDistMinBal" />
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputDistExpDate">Oldest expiration date:<br />
                                    <input type="text" id="inputDistExpDate" v-model="clcDistExpDate" />
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputFull">
                                    <input type="checkbox" id="inputFull" v-model="clcFull" /> Include full matched report.
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputDistExpDate">
                                    <input type="checkbox" id="inputJobNotify" v-model="clcjobNotify" /> Notify me when job is completed.
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <button @click="submitClcDist()" class="btn-sm btn-warning">
                                    Distribute CLC Balance Reports
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-if="activeTog === 'rptSearchTog'" id="reportSearch">
                        <div class="alert-info" v-if="segmentsLoading">Loading... </div>
                        <div v-bind:class="{ 'alert-success': clcSearchRespMsg.status == 'success', 'alert-error': clcSearchRespMsg.status == 'error' }" v-if="clcSearchRespMsg.show">{{ clcSearchRespMsg.message }}</div>
                        <div v-show="clcSearchFormShow">
                        <div class="form-group">
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputSearchSegments">Sales segments:<br />
                                    <select id="inputSearchSegments" multiple v-model="searchParams.segments" @change="clcSearch()">
                                        <option value="unassigned">Unassigned</option>
                                        <option v-for="item in segmentList" v-bind:value="item.id">
                                            {{ item.name }}
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputSearchMinBal">Minimum balance:<br />
                                    <input type="text" id="inputSearchMinBal" v-model="searchParams.minBal" @change="clcSearch()"/>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputSearchExpDate">Oldest expiration date:<br />
                                    <input type="text" id="inputSearchExpDate" v-model="searchParams.expDate" @change="clcSearch()"/>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputSearchSoNum">SO Number:<br />
                                    <input type="text" id="inputSearchSoNum" v-model="searchParams.soNum" @change="clcSearch()"/>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <label class="font-weight-bold" for="inputSearchCustomer">Customer name:<br />
                                    <input type="text" id="inputSearchCustomer" v-model="searchParams.customer" @change="clcSearch()"/>
                                </label>
                            </div>
                            <div class="form-group float-left mr-3">
                                <button @click="submitClcSearchClear()" class="btn-sm btn-warning">
                                    Clear Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                    <vuetable ref="vuetable"
                              api-url="/api/v1/reports/clc_balance"
                              http-method="get"
                              :http-fetch="fetchReport"
                              :fields="['so_number', 'so_type', 'program_name', 'customer_name', 'credits_purchased', 'current_balance', 'act_date', 'exp_date_1', 'sales_theater', 'segment', 'bdm']"
                              :sort-order="[{field: 'id', sortField: 'id', direction: 'desc'}]"
                              pagination-path=""
                              @vuetable:pagination-data="onPaginationData"
                    ></vuetable>
                    <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></vuetable-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vuetable from 'vuetable-2'
    import VuetablePagination from '../components/vuetable-2/VuetablePagination'
    import CssForBootstrap4 from '../components/VuetableStyles'
    import moment from 'moment'

    export default {
        components: {
            Vuetable,
            VuetablePagination
        },
        data() {
            return {
                loading: false,
                error: null,
                message: null,
                css: CssForBootstrap4,
                activeTog: false,
                bdmList: [],
                clcDistBdms: [],
                bdmLoading: true,
                clcDistFormShow: true,
                clcDistRespMsg: {show: false, message: "", status: ""},
                clcDistMinBal: 1,
                clcDistExpDate: moment().subtract(6, 'months').format('YYYY-MM-DD'),
                clcFull : true,
                clcJobNotify: true,
                segmentList: [],
                segmentsLoading: true,
                clcSearchFormShow: true,
                clcSearchRespMsg: {show: false, message: "", status: ""},
                searchParams: {
                    minBal: 1,
                    expDate: null,
                    soNum: null,
                    customer: null,
                    segments: []
                }
            };
        },
        mounted() {
            //this.fetchData();
            this.bdmOptions();
            this.segmentOptions();
        },
        methods: {
            optTogg (toggName) {
                console.log(this.clcDistBdms);
                this.activeTog = this.activeTog === toggName ? false : toggName;
            },
            onPaginationData (paginationData) {
                console.log(paginationData);
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(page)
            },
            clcSearch () {
                this.$refs.vuetable.refresh();
            },
            async bdmOptions() {
                await axios
                    .get('/api/' + this.$apiVersion + '/reports/clc_balance/active_bdms', { headers: { Authorization: 'Bearer '.concat(this.$apiAuth['api_token']) } })
                    .then(
                        response => {
                            this.bdmList = response.data.data;
                            for(var item in response.data.data) {
                                this.clcDistBdms.push(item);
                            }
                            this.bdmLoading = false;
                        }
                    );
            },
            async segmentOptions() {
                await axios
                    .get('/api/' + this.$apiVersion + '/reports/clc_balance/sales_segments', { headers: { Authorization: 'Bearer '.concat(this.$apiAuth['api_token']) } })
                    .then(
                        response => {
                            this.segmentList = response.data.data;
                            for(var item in response.data.data) {
                                this.clcSearchSegments.push(item);
                            }
                            this.segmentsLoading = false;
                        }
                    );
            },
            submitClcDist() {
                this.clcDistFormShow = false;
                let formData = new FormData();
                formData.append('api_token', this.$apiAuth.api_token);
                formData.append('dist_list', this.clcDistBdms);
                formData.append('min_bal', this.clcDistMinBal);
                formData.append('exp_date', this.clcDistExpDate);
                formData.append('full', this.clcFull)
                if(this.clcjobNotify == true) {
                    formData.append('notify', this.$apiAuth.email);
                }
                axios.post('/api/' + this.$apiVersion + '/reports/clc_balance/distribute', formData)
                    .then(
                        response => {
                            this.clcDistRespMsg.message = response.message;
                            this.clcDistRespMsg.status = response.status === 200 ? 'success' : 'error';
                            this.clcDistRespMsg.show = true;
                        }
                    );
            },
            fetchReport (apiUrl, httpOptions) {
                return axios
                    .get('/api/' + this.$apiVersion + '/reports/clc_balance',{
                        headers: {
                            Authorization: 'Bearer '.concat(this.$apiAuth['api_token'])
                        },
                        params: this.searchParams
                    });


            }
        }
    }
</script>