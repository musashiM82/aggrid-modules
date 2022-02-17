<template>
    <div class="w-full h-full app-container">
        <router-view />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';

export default defineComponent({
    name: 'App'
});
</script>

<style lang="scss" scoped>
.app-container {
    height: 100vh;
}
</style>