const createdkey = require('../otherFunctions/createHashList');
const ped = require('../otherFunctions/ped');

exports.createHashList = (req, res) => {
   const hashLength = parseInt(req.params.length);

   if(!hashLength){
     res.status(200).json({isSuccess : false, message : "Hash Code Length is required"});
     return;
   }
  if(hashLength > 25){
     res.status(200).json({isSuccess : false, message : "Each Hash Code Length should be less then 26"});
     return;
  }
  
  if(hashLength < 2){
     res.status(200).json({isSuccess : false, message : "Each Hash Code Length should be more then 1"});
     return;
  }

  const data = createdkey.createHash(hashLength);
  if(data.isSuccess == true){
   res.status(200).json({isSuccess : true, hashCodeKey : data.key});
   return;
  }

  res.status(200).json({isSuccess : false, message : data.error});
  
  
}

exports.encode = (req, res) => {
    const text = req.body.text;
    const key = req.body.key;
   
    if(!text){
       res.status(200).json({isSuccess : false, message : "Text is required"});
       return;
    }
   
    if(!key){
       res.status(200).json({isSuccess : false, message : "Key is required"});
       return;
    }
   
   const encodedData = ped.encode(text, key);
   if(encodedData.isSuccess){
      res.status(200).json({isSuccess : true, encodeText : encodedData.data});
      return;
   }
   
   res.status(200).json({isSuccess : false, message : encodedData.error});
   
}

 exports.decode = (req, res) => {
    const hashCode = req.body.hashcode;
    const key = req.body.key;
   
    if(!hashCode){
       res.status(200).json({isSuccess : false, message : "Hashcode is required"});
       return;
    }

    if(!key){
        res.status(200).json({isSuccess : false, message : "Key is required"});
        return;
     }
     
     const decodedData = ped.decode(hashCode, key);
     if(decodedData.isSuccess){
      res.status(200).json({isSuccess : true, decodeText : decodedData.data});
      return;
     }

     res.status(200).json({isSuccess : false, message : decodedData.error});
     
    
}