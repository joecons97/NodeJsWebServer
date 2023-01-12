# NodeJs WebServer
## Features
* Page generation from layout
* Web api
* Web page delivery

## Page generation
### Layout page
``` html
<html>
  <head>
    ...
  </head>
  <body>
    <div class="header">
      ...
    </div>
    <div class="main">
      <!--MAIN-CONTENT-HERE-->
      <!--The above line is REQUIRED-->
    </div>
  </body>
</html>
```

### Page content
``` html
<layout src="layouts/layoutpage.html"></layout>
<title>Home Page</title>
<content>
  <script
    ...
  </script>
  <div>
    ...
  </div>
</content>
```

### Example Web Api Controller
``` js
import { ApiController } from "../../src/apicontroller.js";

export default class Test extends ApiController
{
  constructor(){
  super();

  //Determines the route used to access the controller
  //"/api/Test/..."
  this.name = "Test";

  //Adds a "get" method method
  this.AddRoute("get", "GetData", () =>{
    return {
      Foo: "Bar"
     };
    });
  }
}
```

### Compile
Clone and run
```
npm install
node server.js
```
