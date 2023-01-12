import {createServer} from "http";
import {stat} from "fs";
import {getApiRoutes} from "./src/apihelper.js"
import {LoadPage} from "./src/pageloader.js";

export function run(){
	let server = createServer(async function(req, res){
		let routeUrl = req.url;
		if(routeUrl == "/" || routeUrl == "")
			routeUrl = "index.html";
	
		console.log(routeUrl);
		stat(`./routes/${routeUrl}`, async (err, stats) => {
			if(err == null && stats.isFile()){
				const pageContent = await LoadPage(routeUrl);
				res.writeHead(200, { 'Content-Type': pageContent.contentType });
				res.write(pageContent.content);
				res.end();
			}
			else{
				let split = routeUrl.split("/");
				let ctrl = split[2];
				let action = split[3];
				let type = req.method;
				let finalRoute = `${type}/${action}`.toLowerCase();
				if(ctrl in global.apiRoutes && finalRoute in global.apiRoutes[ctrl].routes){
					let out = global.apiRoutes[ctrl].routes[finalRoute]();
					res.writeHead(200, { 'Content-Type': "application/json" });
					res.write(JSON.stringify(out));
					res.end();
				}
				else{
					const pageContent = await LoadPage("404.html");
					res.writeHead(404, { 'Content-Type': pageContent.contentType });
					res.write(pageContent.content);
					res.end();
				}
			}
		});
		
	});
	
	getApiRoutes();
	server.listen(5000);
	
	console.log("Server listening on port 5000");
}

run();