const axios = require("axios");
exports.findJobs = async (queryParam) => {
  let param = new URLSearchParams(queryParam).toString();
  const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions.json?${param}`;
  let callJobs = await axios.get(url).then(function (response) {
    return response.data;
  });

  return callJobs;
};


exports.findJobById = async (id) => {
    const url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;
    let callJob = await axios.get(url).then(function (response) {
      return response.data;
    });
  
    return callJob;
  };
  