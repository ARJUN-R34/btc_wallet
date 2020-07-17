const axios = require('axios');

const postRequest = async ({ url, data, headers }) => {
  try {
    const response = await axios({
      url: `${url}`,
      method: 'post',
      data,
      headers: headers || {
        'cache-control': 'no-cache',
      },
    });

    return { response };
  } catch (error) {
    return { error: error.response.data.errors[0].error };
  }
};

module.exports = { postRequest };
