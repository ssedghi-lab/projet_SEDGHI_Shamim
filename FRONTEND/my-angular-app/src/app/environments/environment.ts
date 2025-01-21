// const apiUrl = "http://localhost:3000/api"
const apiUrl = "https://cnamprojetshamim-backend.onrender.com/api"

export const environment = {
  production: false,
  apiUrl,
  backendCatalogue: `${apiUrl}/products`,
  backendSearch:`${apiUrl}/products/search`,
  backendLoginClient: `${apiUrl}/user/login`,
  backendAddClient: `${apiUrl}/user/register`,
  backendUpdateClient: `${apiUrl}/user/update-user`,
  backendGetClient: `${apiUrl}/user/get-user`,
};