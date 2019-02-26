const process = require("process");
const fs = require("fs");
const https = require("https");

const event = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, {
    encoding: "utf-8"
  })
);

if (event.action !== "opened") {
  console.log('Event:' + event.action)
  process.exit(78);
}

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REF = process.env.GITHUB_REF;

const branch = GITHUB_REF.split("/")[2];

const surge = `https://reily_${branch}.surge.sh`;

const options = {
  hostname: "api.github.com",
  port: 443,
  path: `/repos/${GITHUB_REPOSITORY}/issues/${event.number}/comments`,
  method: "POST",
  headers: {
    'User-Agent': 'curl',
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept:
      "application/vnd.github.v3+json; application/vnd.github.antiope-preview+json"
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", d => {
    process.stdout.write(d);
  });

  if (res.statusCode >= 400) {
    process.exit(1);
  }
});

req.on("error", error => {
    console.error(error);
    process.exit(1);
});

req.write(JSON.stringify({body: `Preview this PR at [${surge}](${surge}), check it out!`}));
req.end();
