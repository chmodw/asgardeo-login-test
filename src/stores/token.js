import { defineStore } from 'pinia'

export const createTokenStore = defineStore('token', {
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

        exchangeCodeForToken() {

        }
    }
});