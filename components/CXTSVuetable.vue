<template>
    <div class="list">
        <vuetable ref="vuetable"
                  :api-url="apiUrl"
                  :http-method="httpMethod"
                  :http-fetch="httpFetch"
                  :fields="fields"
                  :sort-order="[{field: 'id', sortField: 'id', direction: 'desc'}]"
                  pagination-path=""
                  @vuetable:pagination-data="onPaginationData"
        ></vuetable>
        <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></vuetable-pagination>
    </div>
</template>
<script>
    import Vuetable from 'vuetable-2'
    import VuetablePagination from '../components/vuetable-2/VuetablePagination'
    import CssForBootstrap4 from '../components/VuetableStyles'

    export default {
        components: {
            Vuetable,
            VuetablePagination
        },
        props: {
            apiUrl: {
                type: String,
                required: true
            },
            fields: {
                type: Array,
                required: true
            },
            httpMethod: {
                type: String,
                default: "get"
            },
            httpFetch: {
                type: Function,
                default: null
            }
        },
        data() {
            return {
                css: CssForBootstrap4,
            };
        },
        methods: {
            onPaginationData (paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(page)
            }
        }
    }
</script>