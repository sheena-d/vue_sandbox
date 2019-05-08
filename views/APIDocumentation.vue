<template>
    <div>

        <div class="api_documentation">
            <h3>API Documentation </h3>

            <div id="swagger"></div>
        </div>
    </div>
</template>
<script>
    import SwaggerUI from 'swagger-ui'
    SwaggerUI({
        dom_id: '#app',
        url: '/swagger/openapi.json'
    })
</script>