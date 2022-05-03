const { ObjectId } = require('mongodb')
const mongo=require('../shared/connect')




module.exports.creatementor= async(req,res,next)=>{
    try{
         var data= await mongo.selectedDB.collection('mentor').insertOne({...req.body})
        res.send(data)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}



module.exports.createstudent= async(req,res,next)=>{
    try{
         var data= await mongo.selectedDB.collection('student').insertOne({...req.body})
        res.send(data)
        console.log(data)

    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports.assignmentor= async(req,res,next)=>{
    const list=[]
    try{        
        var mentorList=await mongo.selectedDB.collection('mentor').find({}).project({mentor_name:1 , _id:0}).toArray()
        for(var mentor of mentorList ){
           list.push(mentor.mentor_name)
        }
        console.log(list)
        for(var l of list){
            if(l.toUpperCase()===req.body.mentor.toUpperCase()){ 
                var data= await mongo.selectedDB.collection('student').findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{mentor:l}});
               
                var data_2= await mongo.selectedDB.collection('mentor').findOneAndUpdate({mentor_name:l},{$set:{student:data.value.student_name}});
               
                console.log(data.value.student_name ,"////////////////////mentor is available")
            }else{
                console.log("Mentor is NOT available")
            }
            
        }

        res.send(data)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}




module.exports.assignstudent=async(req,res,next)=>{
    const list=[]
    try{        
        var studentList=await mongo.selectedDB.collection('student').find({mentor:""}).project({student_name:1 , _id:0}).toArray()
        for(var student of studentList ){
           list.push(student.student_name)
        }
        console.log(list)
    for(var l of list){
        if(l.toUpperCase()===req.body.student.toUpperCase()){
            console.log("I m in function");
            var data_1= await mongo.selectedDB.collection('mentor').findOneAndUpdate({_id:ObjectId(req.params.id)},{$set:{student:l}});
            
           var data_2= await mongo.selectedDB.collection('student').findOneAndUpdate({student_name:l},{$set:{mentor:data_1.value.mentor_name}});
            res.send(data_1)
            //console.log(data_1.value.mentor_name,"///////////////////////////////////////////////////////////////////////////")
            
        }
     
       
    }
    
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}


module.exports.allstudents=async(req,res,next)=>{
    try{
        var studentList=await mongo.selectedDB.collection('mentor').find({_id:ObjectId(req.params.id)}).project({student:1 , _id:0}).toArray();
        console.log(studentList)
        res.send(studentList)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

