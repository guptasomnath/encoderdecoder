# Text Encryptor and Decryptor
Text Encryptor and Decryptor project that allows users to generate and upload custom keys. This project enables encoding and decoding of text using the provided custom key

# Backend API Documentation
  **--Generate Key--**
  
       Endpoint: /chl/lengthOfEveryKey, (ex:- API_URL/chl/5)
       METHOD: GET,
       Example: /chl/5

       Response If Failed:
       {
         isSuccess : false,
         message : "Failed Message"
       }

       Response If Success:
       {
         isSuccess : true,
         hashCodeKey : response
       }
**Note**:- Whenever you want to encode or decode text you need to provide this key.

   **--Encode Text--**
   
      Endpoint: /encode, (ex:- API_URL/encode)
      METHOD: POST,
      Body Params: text, key(the generated key as String)

      Response If Failed:
      {
       isSuccess : false,
       message : "Failed Message"
      }

      Response If Success: 
      {
        isSuccess : true,
        encodeText : response
      }
  **Note**:- You can send the generated key as a String.

  **--Decode Text--**
  
     Endpoint: /decode, (ex:- API_URL/decode)
     METHOD: POST,
     Body Params: hashcode (encoded text), key(the generated key as String)

     Response If Failed: 
     {
       isSuccess : false,
       message : "Failed Message"
     }
     
     Response If Success: 
     {
       isSuccess : true,
       decodeText : response
     }
