import { APICommand, outputItem, outputListing } from '@smartthings/cli-lib'
import { chooseApp, oauthTableFieldDefinitions } from '../../lib/commands/apps/apps-util'


export default class AppOauthCommand extends APICommand {
	static description = 'get OAuth information for the app'

	static flags = {
		...APICommand.flags,
		...outputListing.flags,
	}

	static args = [{
		name: 'id',
		description: 'the app id or number in the list',
	}]

	async run(): Promise<void> {
		const { args, argv, flags } = this.parse(AppOauthCommand)
		await super.setup(args, argv, flags)

		const id = await chooseApp(this, args.id, { allowIndex: true })
		await outputItem(this, { tableFieldDefinitions: oauthTableFieldDefinitions }, () => this.client.apps.getOauth(id))
	}
}
