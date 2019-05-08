<template>
    <div>
        <div class="services">
            <h3>Transfer to Service Source</h3>
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
           <form enctype="multipart/form-data" id="ss_transfer" @submit.prevent="submitSSTransfer">
               <div class="form-group-inline input-group">
                   <label for="ss_transfer_files">Files to transfer</label>
                   <input id="ss_transfer_files" name="ss_transfer_files" v-on:change="handleFileUpload()" ref="ss_transfer_files" type="file" multiple />
               </div>
               <div class="form-group-inline input-group">
                   <label for="ss_transfer_notify"><input id="ss_transfer_notify" name="ss_transfer_notify" ref="ss_transfer_notify" type="checkbox" checked="checked"/> Notify me via email when transfer is complete.
                   </label>
               </div>
               <div class="form-group-inline input-group">
                   <button id="ss_transfer_submit" type="submit">Submit</button>
               </div>
               <input id="ss_transfer_id" name="ss_transfer_id" type="hidden" v-bind:value="this.ss_transfer_id" />
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
                ss_transfer_files: null,
                ss_transfer_id: '1',
            };
        },
        methods: {
            handleFileUpload() {
                this.ss_transfer_files = this.$refs.ss_transfer_files.files;
            },
            submitSSTransfer() {
                this.error = this.services = null;
                this.loading = true;
                this.formVisible = false;
                let formData = new FormData();
                for(var i =0; i < this.ss_transfer_files.length; i++) {
                    let file = this.ss_transfer_files[i];
                    formData.append('transfer_files[' + i + ']', file);
                }
                formData.append('api_token', this.$apiAuth.api_token);
                formData.append('transfer_id', this.ss_transfer_id);
                formData.append('notify', this.$refs.ss_transfer_notify.checked);

                axios
                    .post('/api/' + this.$apiVersion + '/transfer/service_source', formData)
                    .then(response => {
                        console.log(response);
                        this.loading = false;
                        this.message = response.data.message;
                    });
            }
        }
    }
</script>