<template>
  <div>
    <button @click="redirect" class="btn btn-success">Log In</button>
  </div>
</template>

<script>

import {createTokenStore} from "@/stores/token.js";

export default {
  setup() {
    const tokenStore = createTokenStore();

    let organizationName = "silixis";
    let scope = null;
    let redirectUri = "http://localhost:5173/oauth-redirect";
    let clientId = "H3wDLj7abIUR6U5vuf9ATL4Y1k0a";

    const redirect = async () => {
      const codeChallenge = await tokenStore.generateCodeChallenge();
      window.location.href = `https://api.asgardeo.io/t/${organizationName}/oauth2/authorize?scope=${scope}&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&code_challenge=${codeChallenge.challenge}&code_challenge_method=${codeChallenge.method}`;
    }

    return {
      redirect
    }
  }
}
</script>
