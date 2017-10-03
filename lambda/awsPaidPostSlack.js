const aws = require('aws-sdk');
const url = require('url');
const https = require('https');
const cw = new aws.CloudWatch({
  region: 'us-east-1',
  endpoint: 'https://monitoring.us-east-1.amazonaws.com'
});

/* ここから設定 */
// Slackのチャンネル名を指定。#XXXXXXXや@YYYYYYYなど。
const channelName = process.env.SEND_SLACK_CHANNEL;
// Slack Incoming Webhook URLを指定。
const channelUrl = process.env.SEND_SLACK_API_URL;

// サービス名を配列で指定。
const serviceNames = [
  'AmazonEC2',
  'AmazonRDS',
  'AmazonRoute53',
  'AmazonS3',
  'AmazonSNS',
  'AWSDataTransfer',
  'AWSLambda',
  'AmazonKinesis',
  'AmazonRoute53'
];
/* ここまで設定 */

const floatFormat = (number, n) => {
  const pow = Math.pow(10, n);
  return Math.round(number * pow) / pow;
};

const postBillingToSlack = (billings, context) => {
  const fields = [];
  for (const serviceName in billings) {
    fields.push({
      title: serviceName,
      value: floatFormat(billings[serviceName], 2) + ' USD',
      short: true
    });
  }
  const now = new Date();
  now.setHours(now.getHours() + 9);
  const dayOfWeek = now.getDay();
  const dayOfWeekStr = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ][dayOfWeek];
  const message = {
    channel: channelName,
    attachments: [{
      fallback: '今月のAWSの利用料金は、' + floatFormat(billings['Total'], 2) + ' USDです。',
      pretext: `${now.getMonth()+1}/${now.getDate()} (${dayOfWeekStr}) ${('0'+now.getHours()).slice(-2)}:00時点のAWSの利用料金です。`,
      color: 'good',
      fields: fields
    }]
  };
  let body = JSON.stringify(message);
  const options = url.parse(channelUrl);
  options.method = 'POST';
  options.header = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body)
  };
  let statusCode;
  const postReq = https.request(options, (res) => {
    const chunks = [];
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      return chunks.push(chunk);
    });
    res.on('end', () => {
      body = chunks.join('');
      statusCode = res.statusCode;
    });
    return res;
  });
  postReq.write(body);
  postReq.end();
  if (statusCode < 400) {
    context.succeed();
  }
};

const getBilling = (context) => {
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 23, 59, 59);
  const billings = {};
  const totalParams = {
    MetricName: 'EstimatedCharges',
    Namespace: 'AWS/Billing',
    Period: 86400,
    StartTime: startTime,
    EndTime: endTime,
    Statistics: ['Average'],
    Dimensions: [
      {
        Name: 'Currency',
        Value: 'USD'
      }
    ]
  };

  cw.getMetricStatistics(totalParams, (err, data) => {
    if (err) {
      console.error(err, err.stack);
    } else {
      const datapoints = data['Datapoints'];
      if (datapoints.length < 1) {
        billings['Total'] = 0;
      } else {
        billings['Total'] = datapoints[datapoints.length - 1]['Average'];
      }
      if (serviceNames.length > 0) {
        serviceName = serviceNames.shift();
        getEachServiceBilling(serviceName);
      }
    }
  });

  const getEachServiceBilling = (serviceName) => {
    const params = {
      MetricName: 'EstimatedCharges',
      Namespace: 'AWS/Billing',
      Period: 86400,
      StartTime: startTime,
      EndTime: endTime,
      Statistics: ['Average'],
      Dimensions: [
        {
          Name: 'Currency',
          Value: 'USD'
        },
        {
          Name: 'ServiceName',
          Value: serviceName
        }
      ]
    };
    cw.getMetricStatistics(params, (err, data) => {
      if (err) {
        console.error(err, err.stack);
      } else {
        const datapoints = data['Datapoints'];
        if (datapoints.length < 1) {
          billings[serviceName] = 0;
        } else {
          billings[serviceName] = datapoints[datapoints.length - 1]['Average'];
        }
        if (serviceNames.length > 0) {
          serviceName = serviceNames.shift();
          getEachServiceBilling(serviceName);
        } else {
          postBillingToSlack(billings, context);
        }
      }
    });
  };
};

exports.handler = (event, context) => {
  getBilling(context);
};
