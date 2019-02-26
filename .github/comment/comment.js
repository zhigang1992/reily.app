const process = require('process');
const fs = require('fs');
const fetch = require('node-fetch');

const event = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, {
      encoding: "utf-8"
    })
);

if (event.action !== 'opened') {
    process.exit(78)
}

const GITHUB_REPOSITORY = process.env.GITHUB_REPOSITORY
const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_REF = process.env.GITHUB_REF

const branch = GITHUB_REF.split('/')[2]

const surge = `https://reily_${branch}.surge.sh`

fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${event.number}/comments`, {
    headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json; application/vnd.github.antiope-preview+json',
        body: `Will be deployed to [${surge}](${surge}), check it out!`
    }
}).then(() => {
    console.log('Deploy Success')
}).catch((error) => {
    console.error(error)
    process.exit(1)
})


