import { handleAsyncError as handle } from '../../utils/async'
import { success } from '../../utils/log'
import { successEmoji } from '../../utils/emojis.js'
import { setContext, getContext, emptyContext, storeRuntimeConfig } from '../../context'
import { pick } from 'lodash'
export const command = 'remove'

export const desc = 'Removes a config from ~/.contentfulrc.json'

export const builder = (yargs) => {
  return yargs
    .usage('Usage: contentful config remove [options]')
    .option('management-token', {
      alias: 'mt',
      describe: 'Remove the API management token from the config',
      type: 'boolean',
      default: false
    })
    .option('active-space-id', {
      alias: 'as',
      describe: 'Remove the active space id from the config',
      type: 'boolean',
      default: false
    })
    .option('active-environment-id', {
      alias: 'ae',
      describe: 'Remove the active environment id from the config'
    })
    .option('host', {
      alias: 'ho',
      describe: 'Remove the management host from the config'
    })
    .option('proxy', {
      alias: 'p',
      describe: 'Remove the proxy from the config',
      type: 'boolean',
      default: false
    })
    .option('raw-proxy', {
      alias: 'rp',
      describe: 'Pass proxy config as raw config instead of creating a httpsAgent',
      type: 'boolean'
    })
    .option('all', {
      describe: 'Remove all the things from the config',
      type: 'boolean',
      default: false
    })
}

export const removeHandler = async (argv) => {
  let context = await getContext()
  const optionsToPick = ['cmaToken', 'proxy', 'activeSpaceId']
  let options = pick(context, optionsToPick)
  if (argv.all) {
    options = {}
  } else {
    if (argv.managementToken) {
      delete options['cmaToken']
    }
    if (argv.activeSpaceId) {
      delete options['activeSpaceId']
    }
    if (argv.proxy) {
      delete options['proxy']
    }
  }
  emptyContext()
  setContext(options)
  await storeRuntimeConfig()
  success(`${successEmoji} config removed successfully`)
}

export const handler = handle(removeHandler)
