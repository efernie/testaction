import { getInput, setFailed } from '@actions/core'
import { getOctokit } from '@actions/github'

async function run() {
  try {
    const inputs = {
      token: getInput('token'),
      repository: getInput('repository'),
      eventType: getInput('event-type'),
      clientPayload: getInput('client-payload')
    }

    const [owner, repo] = inputs.repository.split('/')

    const octokit = getOctokit(inputs.token)

    await octokit.repos.createDispatchEvent({
      owner: owner,
      repo: repo,
      event_type: inputs.eventType,
      client_payload: JSON.parse(inputs.clientPayload)
    })
  } catch (error) {
    setFailed(error.message)
  }
}

run()