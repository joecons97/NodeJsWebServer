import { readdirSync } from "fs";

global.apiRoutes = {};

export async function getApiRoutes(){
	let dirInfo = readdirSync("./routes/api/");
	for(let i = 0; i< dirInfo.length; i++){
		let object = await import(`../routes/api/${dirInfo[i]}`);
		let controller = new object.default();
		global.apiRoutes[controller.name] = controller;
	}
}