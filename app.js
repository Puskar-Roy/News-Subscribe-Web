const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.post("/",(req,res)=>{
    // res.send(req.body.f+req.body.s);
    // const api_key = "3838edbd5402864cb5df1dc3b523e683-us11";
    const list_id ="dd4f13dc3c";

    

    const data = {
        members:[{
            email_address : req.body.email,
            status:"subscribed",
            merge_fields:{
                FNAME:req.body.f,
                LNAME:req.body.s
            }
        }]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/dd4f13dc3c";
    
    const options = {
        method:"POST",
        auth: "puskar3:3838edbd5402864cb5df1dc3b523e683-us11"
    }

    const request = https.request(url,options,(response)=>{
        response.on("data",(data)=>{
           console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end()
})

app.listen(3000,()=>{
    console.log("Server Starting")
})