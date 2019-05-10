const Tic = require('../../models/index').User

exports.saveState = function(req, res){
    let body = req.body.payload
    let data = new Tic(body)
    
    // Tic.findById(req.body.id, (err,doc) =>{
    //     if(err){
            data.save().then(doc => {
                res.send({id: doc._id})
              })
              .catch(err => {
                console.error(err)
              })
        // } else{
        //     Tic.findOneAndUpdate({_id:req.body.id}, body, (err, doc)=>{
        //         console.log(doc)
        //         res.send({id: doc._id})
        //     })
        // }
    // })
}

exports.getState = function(req, res){
    Tic.find({}, (err,doc) =>{
        res.send(doc)
    })
}

exports.delete = function(req, res){
    Tic.remove({}, (err,doc) =>{
        res.send(doc)
    })
}
