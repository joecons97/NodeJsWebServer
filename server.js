import {createServer} from "http";
import {stat} from "fs";
import {getApiRoutes, apiCall} from "./src/apihelper.js"
import {LoadPage} from "./src/pageloader.js";

export function run(){
	let server = createServer(async function(req, res){
		let routeUrl = req.url;
		if(routeUrl == "/" || routeUrl == "")
			routeUrl = "index.html";
	
		stat(`./routes/${routeUrl}`, async (err, stats) => {
			if(err == null && stats.isFile()){
				const pageContent = await LoadPage(routeUrl);
				res.writeHead(200, { 'Content-Type': pageContent.contentType });
				res.write(pageContent.content);
				res.end();
			}
			else if(!(await apiCall(req, res))){
				const pageContent = await LoadPage("404.html");
				res.writeHead(404, { 'Content-Type': pageContent.contentType });
				res.write(pageContent.content);
				res.end();
			}
		});
		
	});
	
	getApiRoutes();
	server.listen(5000);
	
	console.log("Server listening on port 5000");
}

run();