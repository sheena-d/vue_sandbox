<template>
    <div>

        <div class="services">
            <h3>Available Services</h3>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>

            <ul class="list-group" v-if="services">
                <li class="list-group-item services-link" v-for="{ title, href } in services">
                    <a :href="href">{{ title }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                loading: false,
                services: null,
                error: null,
            };
        },
        mounted() {
            this.fetchData();
        },
        methods: {
            fetchData() {
                console.log("fetchData");
                this.error = this.services = null;
                this.loading = true;
                axios
                    .get('/api/' + this.$apiVersion + '/services', { headers: { Authorization: 'Bearer '.concat(this.$apiAuth['api_token']) } })
                    .then(response => {
                        console.log(response);
                        this.loading = false;
                        this.services = response.data.data.services;
                    });
            }
        }
    }
</script>