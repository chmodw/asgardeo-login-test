<style scoped></style>

<template>
  <div>
    <h1>Redirecting</h1>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()

    onMounted(() => {
      let payload = {
        code: route.query.code,
        sessionState: route.query.session_state,
        state: route.query.state
      }

      console.log(payload)
    })

    return {}
  }
}
</script>
