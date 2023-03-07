const axios = require('axios')
const BASE_URL = 'http://localhost:5173'
const getLinkedinAuthToken = async (code) => {
    let redirect_uri = `${BASE_URL}/callbacks`;
    let client_id = "86o3pfdquzum55"
    let client_secret = "m0mOlmIFPVGwZLud" 
    const options = {
        method: 'post',
        url: 'https://www.linkedin.com/oauth/v2/accessToken',
        headers: {
          Authorization: 'Basic ' + btoa( client_id + ':' + client_secret),
          "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: {
            code,
            redirect_uri,
            grant_type: 'authorization_code',
            client_secret
          },
    }
    const {data} = await axios.request(options)
    return data
}