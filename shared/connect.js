const {MongoClient}= require('mongodb')

module.exports={
    selectedDB:{},
    async connect(){
        try{
           // const client =await MongoClient.connect("mongodb://localhost:27017");
           const client =await MongoClient.connect("mongodb+srv://projectUser:Z8TltZKoIUZQND8S@cluster0.c8wpk.mongodb.net?retryWrites=true&w=majority");
           this.selectedDB=client.db("school");
           console.log(this.selectedDB)
        }catch(err){
            console.log(err)
        }
    }
}