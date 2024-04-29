<style scoped></style>

<template>
  <div>
    <h1>Redirecting</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useTokenStore } from "@/stores/token.js";

export default {
  setup() {
    const route = useRoute()
    const tokenStore = useTokenStore();

    onMounted(() => {
      let payload = {
        code: route.query.code,
        sessionState: route.query.session_state,
        state: route.query.state
      }

      // exchange the code for token
      const accessToken = tokenStore.exchangeCodeForToken(payload.code);

      console.log(accessToken)
    })

    return {}
  }
}
</script>
