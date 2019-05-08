<template>
    <div>
        <div class="services">
            <h3>CLC Balance Import</h3>
            <div class="loading" v-if="loading">
                Loading...
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <div v-if="message" class="message">
                {{ message }}
            </div>
            <div v-if="formVisible" class="form">
           <form enctype="multipart/form-data" id="clc_balance_import" @submit.prevent="submitCLCBalance">
               <div class="form-group-inline input-group">
                   <label for="clc_import_file">Upload CLC Balance File</label>
                   <input id="clc_import_file" name="clc_import_file" v-on:change="handleFileUpload()" ref="clc_import_file" type="file" />
               </div>
               <div class="form-group-inline input-group">
                   <label for="clc_import_notify"><input id="clc_import_notify" name="clc_import_notify" ref="clc_import_notify" type="checkbox" checked="true" /> Notify me via email when import is complete.
                   </label>
               </div>
               <div class="form-group-inline input-group">
                   <button id="clc_balance_submit" type="submit">Submit</button>
               </div>
               <input id="clc_creator_email" name="clc_creator_email" type="hidden" v-bind:value="this.clc_creator_email" />
           </form>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                loading: false,
                error: null,
                message: null,
                formVisible: true,
                clc_import_file: null,
                clc_creator_email: this.$apiAuth.email
            };
        },
        mounted() {
            //this.fetchData();
        },
        methods: {
            handleFileUpload() {
                console.log(this.$refs.clc_import_file);
                this.clc_import_file = this.$refs.clc_import_file.files[0];
            },
            submitCLCBalance() {
                this.error = this.services = null;
                this.loading = true;
                this.formVisible = false;
                let formData = new FormData();
                let file = this.clc_import_file;
                formData.append('clc_import_file', file);
                formData.append('api_token', this.$apiAuth.api_token);
                formData.append('clc_creator_email', this.clc_creator_email);
                formData.append('clc_import_notify', this.$refs.clc_import_notify.valueOf());
                axios
                    .post('/api/' + this.$apiVersion + '/reports/clc_balance/import', formData)
                    .then(response => {
                        console.log(response);
                        this.loading = false;
                        this.message = response.data.message;
                    });
            }
        }
    }
</script>