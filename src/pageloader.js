import {LoadFile} from "./fileloader.js"
import { isPageCompiled, compilePage } from "./pagecompiler.js";

export async function LoadPage(pageLocation){
	const fileContent = await LoadFile(`./routes/${pageLocation}`);

	if(isPageCompiled(fileContent.content)){
		console.log("Compiling page...");
		fileContent.content = await compilePage(fileContent.content);
	}

	return fileContent;
}