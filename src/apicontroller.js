export class ApiController{
	constructor(){
		this.name = "";
		this.routes = {};
	}

	AddRoute(type, route, func){
		this.routes[`${type}/${route}`.toLowerCase()] = func;
	}

	Call(route){
		try{
			return this.routes[route]();
		}
		catch{
			return `Route ${route} not found`;
		}
	}
}