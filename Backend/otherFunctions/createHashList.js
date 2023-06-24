exports.createHash = (perHashLength) =>{
  const hasGeneratingWord = Array.from(process.env.HASH_GENERATE_WORDS);
  const createdHash = [];

  let i = 0;
  let innerIndex = 0;

  try{ //if any error is happen in outter loop

   while(i < hasGeneratingWord.length + 1){

      let hashCode = '';
      try{ // if any error will happen in inner loop

         while(innerIndex < perHashLength){
  
            const randomPosition = parseInt(Math.random() * hasGeneratingWord.length);
    
            hashCode += hasGeneratingWord[randomPosition];
            innerIndex++;
         }
         
         innerIndex = 0;
         if(createdHash.indexOf(hashCode) == -1){
    
          createdHash.push(hashCode);
          i++;
    
         }

      }catch(err){
         return {isSuccess : false, error: err};
      }
      
     }
  }catch(err){
   return {isSuccess : false, error: err};
  }

   return {isSuccess : true, key: JSON.stringify(createdHash)};
}