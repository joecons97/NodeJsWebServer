import {stat} from "fs";
import {open} from "fs/promises";
import mime from "mime";

export async function LoadFile(fileLocation){
	try{
		const fileHandler = await open(`${fileLocation}`);
		const fileText = await fileHandler.readFile();
	
		fileHandler.close();
	
		return {
			contentType: mime.getType(`${fileLocation}`),
			content: fileText
		}
	}
	catch(err){
		return {
			contentType: "",
			content: err.toString()
		}
	}
	
}