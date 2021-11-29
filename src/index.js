const core = require('@actions/core');
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function run() {
  try {
    console.log(url)
    console.log(headers)
    console.log(name)
    console.log(path)
  
    const url = core.getInput('url')
    const headers = JSON.parse(core.getInput('headers') || [])  
    console.log(headers)
    const name = core.getInput('name')
    const path = core.getInput('file')
    core.info(`Connecting to endpoint (${url}) ...`)

    
    const form = new FormData();

    form.append(name, fs.createReadStream(path));

    const response = await axios({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'multipart/form-data', ...[headers] },
      data: form,
    })

    core.setOutput('response', { 'statusCode': response.statusCode, 'data': response.data });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
