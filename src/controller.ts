import { Config } from "./config";
import { pino } from 'pino';
import * as fs from 'fs';


class Controller {
	public Ready: Promise<any>;
	public config: Config = new Config();
	private logger: any;

	constructor(config?: Config){
		// if(config){
		// 	this.config = config;
		// }

		this.Ready = new Promise((resolve, reject) => {
			this.createLogger();
			resolve(undefined);
		})
	}

	async createLogger(){
		await this.config.Ready

		let logDir = this.config.getLogDir();
		let logFile = this.config.getLogFile();
		let logRoute = logDir + logFile;

		console.log("Directorio ----------->", logDir)
		console.log("Archivo    ----------->", logFile)
		if(!fs.existsSync(logDir)){
			try { fs.mkdirSync(logDir, {recursive: true}) }
			catch (err) { console.error(err) }
		}

		const dest = pino.destination(logRoute);
		this.logger = pino(dest);
	}


	async getLogger(): Promise<any> {
		await this.Ready;
		return this.logger;
	}
}


const controller = new Controller();
export { controller }