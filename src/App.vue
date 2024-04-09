<style scoped>

</style>

<template>
  <div>
    <button @click="signIn">Log In</button>
  </div>
</template>

<script>
import {AsgardeoSPAClient} from '@asgardeo/auth-spa';
export default {
  setup() {

    var auth = AsgardeoSPAClient.getInstance();

    auth.initialize({
      signInRedirectURL: "http://localhost:5173/oauth-redirect",
      signOutRedirectURL: "http://localhost:5173/oauth-redirect",
      clientID: "H3wDLj7abIUR6U5vuf9ATL4Y1k0a",
      baseUrl: "https://api.asgardeo.io/t/silixis",
      scope: ["openid", "profile"]
    });

    const signIn = () => {
      auth.signIn();
    };

    const signUp = () => {

    }

    return {
      signIn,
      signUp,
    }
  }
}


</script>