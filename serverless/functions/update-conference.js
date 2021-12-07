const TokenValidator = require('twilio-flex-token-validator').functionValidator;

exports.handler = TokenValidator(async function(context, event, callback) {  
  const client = context.getTwilioClient();
  // Create a custom Twilio Response
  // Set the CORS headers to allow Flex to make an HTTP request to the Twilio Function
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');

  const conferenceSid = event.conferenceSid;
  const announceUrl = event.announceUrl;

if (!conferenceSid || !announceUrl) {
  response.appendHeader('Content-Type', 'plain/text');
  response.setBody('Missing conferenceSid or announceUrl');
  response.setStatusCode(400);
  return callback(null, response);
}

if (conferenceSid.substring(0,2) !== 'CF') {
  response.appendHeader('Content-Type', 'plain/text');
  response.setBody('Invalid conferenceSid');
  response.setStatusCode(400);
  return callback(null, response);
}

  const conference = await client
    .conferences(conferenceSid)
    .update({
      announceUrl
    }).catch(e => {
      console.error(e);
    });

  // Update the rest of the response.
  response.appendHeader('Content-Type', 'application/json');
  response.setBody(conference);

  callback(null, response);
});

