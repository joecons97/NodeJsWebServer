import { ApiController } from "../../src/apicontroller.js";

export default class Test extends ApiController
{
	constructor(){
		super();

		this.name = "Test";

		this.AddRoute("get", "GetData", () =>{
			return {
				Name: "Joe"
			};
		});
	}
}