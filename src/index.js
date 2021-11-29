const core = require('@actions/core');
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function run() {
  try {

  
    const url = core.getInput('url')
    const headers = JSON.parse(core.getInput('headers') || [])  
    const name = core.getInput('name')
    const file = core.getInput('file')
    console.log(url)
    console.log(headers)
    console.log(name)
    console.log(file)
    core.info(`Connecting to endpoint (${url}) ...`)

    
    const form = new FormData();

    form.append(name, fs.createReadStream(file));

    const response = await axios({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'multipart/form-data', ...[headers] },
      data: form,
    })
    console.log(response)

    core.setOutput('response', { 'statusCode': response.statusCode, 'data': response.data });
  } catch (error) {
    console.log(error)
    core.setFailed(error.message);
  }
}

run();
