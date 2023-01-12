import {LoadFile} from "./fileloader.js"
import libxmljs2 from "libxmljs2"

const XML_WRAPPER = 
`<?xml version="1.0" encoding="UTF-8"?>
<root>
CONTENT
</root>`;

export function isPageCompiled(pageContent){
	return pageContent.includes("<layout") && pageContent.includes("<content>");
}

export async function compilePage(pageContent){
	const xmlPage = XML_WRAPPER.replace("CONTENT", pageContent);

	const xml = libxmljs2.parseXmlString(xmlPage);
	const layoutLocation = xml.get("layout").attr("src").value();
	const layoutContent = (await LoadFile(`./routes/${layoutLocation}`)).content.toString();
	
	let content = xml.get("//content").toString().replace("<content>", "").replace("</content>", "");
	const finalContent = layoutContent.replace("<!--MAIN-CONTENT-HERE-->", content);
	
	const contentHtml = libxmljs2.parseHtmlString(finalContent);
	if(xml.get("title")){
		const titleTag = libxmljs2.Element(contentHtml, "title", xml.get("title").text());
		contentHtml.get("//link").addPrevSibling(titleTag);
	}
	
	return contentHtml.toString();
}