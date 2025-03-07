/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();


//  res.status(200).json(files) this json(files) convert files array into the json object.
app.get('/files',(req,res)=>{
  const dirpath = "./files/"

  fs.readdir(dirpath,(err,files)=>{
    if (err) {
      console.error("Error reading directory:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.status(200).json(files)
  })
})

app.get('/files:filename',(req,res)=>{
  const filName = req.params.filename;
  const filePath = path.join(__dirname,"files",filName)


  fs.access(filePath,fs.constants.F_OK,(err)=>{
    if (err) {
      console.error("Error reading directory:", err);
      res.status(404).json({ error: "File Not Found" });
      return;
    }
  })

 fs.readFile(filePath,"utf-8",(err,data)=>{
 if(err){
  console.error("Error reading File",err);
  res.status(500).send("file not found");
  return;
 }

 res.status(200).send(data);
 })
})
app.use((req, res) => {
  res.status(404).send("Route Not found");
});


module.exports = app;
