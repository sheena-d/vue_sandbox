<template>
    <div>
    <div class="row" id="app-navigation">
        <div class="container">
            <div class="col-md-12" >
                <div class="crumb"></div>
                <div class="navbar">
                    <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="container">
            <div class="col-md-12">
                <router-view></router-view>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    export default {}
</script>