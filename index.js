const express=require("express")
const mongo=require('./shared/connect')
const managementRouter=require("./router/management")
const app=express();
app.use(express.json());
mongo.connect();

app.use("/",managementRouter)
// app.use("/mentor",managementRouter)
// app.use("/student",managementRouter)

app.listen(process.env.PORT || 4200);