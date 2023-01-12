import { ApiController } from "../../src/apicontroller.js";

export default class UserController extends ApiController
{
	constructor(){
		super();

		this.name = "User";

		this.AddRoute("get", "GetData", ({}) =>{
			return {
				Name: "Joe"
			};
		});
	}
}