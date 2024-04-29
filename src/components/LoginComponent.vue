<style scoped></style>

<template>
  <div>
    <button @click="signIn">Log In</button>
  </div>
</template>

<script>
// import { AsgardeoSPAClient } from '@asgardeo/auth-spa'
import { ref, onMounted } from 'vue';
import crypto from 'crypto-js';

export default {
  setup() {
    // var auth = AsgardeoSPAClient.getInstance();

    // auth.initialize({
    //   signInRedirectURL: "http://localhost:5173/oauth-redirect",
    //   signOutRedirectURL: "http://localhost:5173/oauth-redirect",
    //   clientID: "H3wDLj7abIUR6U5vuf9ATL4Y1k0a",
    //   baseUrl: "https://api.asgardeo.io/t/silixis",
    //   scope: ["openid", "profile"]
    // });

    let organizationName = "silixis";
    let scope = null;
    let redirectUri = "http://localhost:5173/oauth-redirect";
    let clientId = "H3wDLj7abIUR6U5vuf9ATL4Y1k0a";
    let codeChallenge = ref(null);
    let codeChallengeMethod = ref('S256');
    let codeVerifier = ref(null);


    const generateRandomString = (length) => {
      const array = new Uint8Array(length);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(36)).join('');
    }

    const sha256 = (plain) => {
      // Returns promise that resolves with the base64-encoded hash
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest('SHA-256', data).then(buffer => {
        return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
      });
    }

    const base64urlencode = (str) => {
      // Replace '+' with '-', '/' with '_' and remove '='
      return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    const generateCodeChallenge = async () => {
      codeVerifier.value = generateRandomString(128);
      codeChallenge.value = await sha256(codeVerifier.value).then(base64urlencode);
    };

    const signIn = async () => {
      await generateCodeChallenge();
      // auth.signIn()
      let baseUrl = `https://api.asgardeo.io/t/${organizationName}/oauth2/authorize?scope=${scope}&response_type=code&redirect_uri=${redirectUri}&client_id=${clientId}&code_challenge=${codeChallenge.value}&code_challenge_method=${codeChallengeMethod.value}`
      // console.log(baseUrl);
      window.location.href = baseUrl;
    }

    return {
      signIn
    }
  }
}
</script>
