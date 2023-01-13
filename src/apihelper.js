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

export async function apiCall(req, res) {
	let split = req.url.split("/");
	let ctrl = split[2];
	let action = split[3];
	let type = req.method;
	let finalRoute = `${type}/${action}`.toLowerCase();
	if(ctrl in global.apiRoutes && finalRoute in global.apiRoutes[ctrl].routes){
		let body = "";

		req.on('readable', function() {
			body += req.read();
		});

		let result = await new Promise(resolve => {
			req.on("end", async () =>{
				if(body == "")
					body = "{}";
					
				const func = global.apiRoutes[ctrl].routes[finalRoute];
				let out = await func(getQueryString(req), JSON.parse(body));
				resolve(out);
			});
		});

		res.writeHead(200, { 'Content-Type': "application/json" });
		res.write(JSON.stringify(result));
		res.end();

		return true;
	}
	return false;
}

export function getQueryString(req){
	var url = req.url;

	var queryString = url.split("?")[1];

	if(!queryString){
		return {};
	}
	
	var elements = queryString.split("&");

	var queryObject = {};

	for(let i = 0; i < elements.length; i++){
		let elm = elements[i].split("=");
		if(!elm[0] in queryObject){
			queryObject[elm[0]] = elm[1];
		}
	}

	return queryObject;
}