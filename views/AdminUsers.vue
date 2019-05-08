<template>
    <div>
        <div class="services">
            <h3>Manage Users</h3>
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
                      :fields="fields"
                      :http-method="httpMethod"
                      :http-fetch="httpFetch"
                      pagination-path=""
                      @vuetable:pagination-data="onPaginationData">
                <template  slot="edit-link" slot-scope="props">
                    <span @click="editLinkAction(props.rowData)" class="btn btn-sm btn-warning " style="cursor:pointer;">
                        <span v-if="props.rowData.status == 'ACTIVE'">
                            EDIT
                        </span>
                        <span v-else-if="props.rowData.status == 'PENDING'">
                            APPROVE
                        </span>
                        <span v-else-if="props.rowData.status == 'INACTIVE'">
                            ACTIVATE
                        </span>
                    </span>
                </template>
            </vuetable>
            <vuetable-pagination ref="pagination" @vuetable-pagination:change-page="onChangePage" :css="css.pagination"></vuetable-pagination>

        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import Vuetable from 'vuetable-2'
    import VuetablePagination from '../components/vuetable-2/VuetablePagination'
    import CssForBootstrap4 from '../components/VuetableStyles'
    import moment from 'moment'
  //  import Modal from '../components/ModalConfirm'

    export default {
        components: {
            Vuetable,
            VuetablePagination,
           // Modal
        },
        methods: {
            onPaginationData (paginationData) {
                console.log(paginationData);
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage (page) {
                this.$refs.vuetable.changePage(page)
            },
            editLinkAction (rowData) {
                switch(rowData.status) {
                    case 'ACTIVE':
                        break;
                    case 'PENDING':
                        break;
                    case 'INACTIVE':
                        break;
                }
            }
        },
        data() {
            return {
                loading: false,
                error: null,
                message: null,
                css: CssForBootstrap4,
                apiUrl: "/api/v1/admin/users",
                httpMethod: "get",
                //searchParams: {},
                httpFetch: function (apiUrl, httpOptions) {

                    return axios
                        .get(apiUrl, {
                            headers: {
                                Authorization: 'Bearer '.concat(this.$apiAuth['api_token'])
                            },
                            //params: searchParams
                        });
                },
                fields: [
                    {
                        name: 'id'
                    },
                    {
                        name: 'username'
                    },
                    {
                        name: 'fullname'
                    },
                    {
                        name: 'status'
                    },
                    {
                        name: 'roles'
                    },
                    {
                        name: 'last_login',
                            callback: (value) => {
                                return (value === null)
                                    ? ''
                                    : moment(value, 'YYYY-MM-DD hh:mm:ss').fromNow()
                            }
                    },
                    {
                        name: '__slot:edit-link',
                        title: 'edit link',

                    },
                    {
                        name: 'id',
                        dataClass: 'hidden'
                    }

                ]
            };
        },

    }
</script>