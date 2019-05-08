<template>
    <div>
        <div class="services">
            <h3>CLC Balance Import History</h3>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <div v-if="message" class="message">
                {{ message }}
            </div>
            <vuetable ref="vuetable"
                      :api-url="apiUrl"
                      http-method="get"
                      :http-fetch="fetchReport"
                      :fields="fields"
                      pagination-path=""
                      @vuetable:pagination-data="onPaginationData"
            ></vuetable>
            <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></vuetable-pagination>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vuetable from 'vuetable-2'
    import VuetablePagination from '../components/vuetable-2/VuetablePagination'
    import CssForBootstrap4 from '../components/VuetableStyles'
    export default {
        components: {
            Vuetable,
            VuetablePagination
        },
        mounted() {
            //this.fetchData();
        },
        methods: {
            onPaginationData (paginationData) {
                console.log(paginationData);
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(page)
            },
            fetchReport: function (apiUrl, httpOptions) {
                return axios
                    .get(apiUrl, {
                        headers: {
                            Authorization: 'Bearer '.concat(this.$apiAuth['api_token'])
                        },
                        //params: searchParams
                    });
            },
        },
        data() {
            return {
                css: CssForBootstrap4,
                loading: false,
                error: null,
                message: null,
                apiUrl: "/api/v1/reports/clc_balance/import/list",
                httpMethod: "get",
                sortorder: [{field: 'id', sortField: 'id', direction: 'desc'}],
                fields: ['id', 'source', 'creator', 'filepath', 'status', 'created_at'],
                //searchParams: {}
            };
        },

    }
</script>