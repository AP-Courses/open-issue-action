import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const token = core.getInput('token')
    const title = core.getInput('title')
    const body = core.getInput('body')
    const assignees = core.getInput('body')

    const octokit = github.getOctokit(token)
    const response = await octokit.rest.issues.create({
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      title: title,
      body: body,
      assignees: assignees ? assignees.split('\n') : undefined
    })
    core.setOutput('issue', response.data)
  } catch (error) {
    core.setFailed(error.message)
  }
}
