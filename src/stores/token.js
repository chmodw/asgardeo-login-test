import { defineStore } from 'pinia'
import axios from "axios";

export const useTokenStore = defineStore('token', {
    state: () => ({
        codeChallenge: '',
        codeChallengeMethod: 'S256',
        codeVerifier: '',
    }),
    getters: {
        getCodeChallenge: (state) => state.codeChallenge,
        getCodeChallengeMethod: (state) => state.codeChallengeMethod,
        getCodeVerifier: (state) => state.codeVerifier,
    },
    actions: {
        generateRandomString() {
            const array = new Uint8Array(32);
            window.crypto.getRandomValues(array);
            return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
        },

        sha256(plain) {
            const encoder = new TextEncoder();
            const data = encoder.encode(plain);
            return window.crypto.subtle.digest('SHA-256', data).then(buffer => {
                return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
            });
        },

        encode (str) {
            return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        },

        async generateCodeChallenge () {
            this.codeVerifier = this.generateRandomString();
            this.codeChallenge = await this.sha256(this.codeVerifier);
            this.codeChallenge = this.encode(this.codeChallenge);

            return {
                verifier: this.codeVerifier,
                challenge: this.codeChallenge,
                method: this.codeChallengeMethod
            }
        },

        async exchangeCodeForToken(code) {
            const endpoint = "https://api.asgardeo.io/t/silixis/oauth2/token";

            const body = JSON.stringify({
                code: code,
                grant_type: "authorization_code",
                redirect_uri: "http://localhost:5173/redirect",
                code_verifier: this.codeVerifier,
                client_id: "H3wDLj7abIUR6U5vuf9ATL4Y1k0a"
            });

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            };

            await axios.post(endpoint, body, config).then((res) => {
                console.log(res);
            });
        }
    }
});