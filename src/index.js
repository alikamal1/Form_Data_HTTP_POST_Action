const core = require('@actions/core');
const FormData = require('form-data');
const fs = require('fs');
const axios = require('axios');

async function run() {
  try {
    const url = core.getInput('url')
    const headers = JSON.parse(core.getInput('headers') || '{}')
    const data = JSON.parse(core.getInput('data') || '{}')
    const name = core.getInput('name')
    const file = core.getInput('file')

    console.log(`URL: ${url}`)
    console.log(`Headers: ${headers}`)
    console.log(`Data: ${data}`)
    console.log(`File Name: ${name}`)
    console.log(`File Path: ${file}`)
    core.info(`Connecting to endpoint (${url}) ...`)

    const form = new FormData();
    for (const [key, value] of Object.entries(data)) {
      form.append(key, value)
    }


    if (name && file) {
      form.append(name, fs.createReadStream(file));
    }

    const response = await axios({
      method: 'POST',
      url: url,
      headers: { 'Content-Type': 'multipart/form-data', ...headers },
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
