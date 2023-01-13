import { ApiController } from "../../src/apicontroller.js";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
		
		this.AddRoute("POST", "RunCalc", async (queryString, body) =>{
			let final = 0;

			for(let i = 0; i < 100; i++){
				let a = Math.exp(body.num0);
				await sleep(1);
				let b = Math.sqrt(a);
				let c = Math.sqrt(body.num1);
				let d = a * b;
				final = d * c;
			}

			return {
				value: final
			};
		});
	}
}