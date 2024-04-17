const data_list = require('./constructs.json');

exports.handler = async function(event) {

  // https://mylambda.com?data_id=1
  const data_id = parseInt(event.queryStringParameters.data_id);

  // console.log("test")
  const data_item = data_list.find(item => item.id === data_id)
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/json" },
    body: JSON.stringify(data_item)
  };
};
