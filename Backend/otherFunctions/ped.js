const word = Array.from(process.env.WORDS);
let hase = [];

exports.encode = (text, hashList) => {
  try {

    try{
      hase = JSON.parse(hashList);
    }catch{
      return { isSuccess: false, error: "Uploaded Key Is Wrong" };
    }

    let encodedText = "";
    for (let i = 0; i < text.length; i++) {
      const indexOf = word.indexOf(text.charAt(i));
      encodedText += indexOf == -1 ? text.charAt(i) : hase[indexOf];
    }

    return { isSuccess: true, data: encodedText };
  } catch (err) {
    return { isSuccess: false, error: err };
  }
};

exports.decode = (text, hashList) => {

  try{

    try{
      hase = JSON.parse(hashList);
    }catch{
      return { isSuccess: false, error: "Uploaded Key Is Wrong" };
    }

    let value = text;
    let decodedText = "";
    while (value != "") {
      let sliceData = value.slice(0, hase[0].length);
      const indexOf = hase.indexOf(sliceData);
      if (indexOf == -1) {
        sliceData = value.slice(0, 1);
        decodedText += sliceData;
      } else {
        decodedText += word[indexOf];
      }
  
      value = value.replace(sliceData, "");
    }
    
    return { isSuccess: true, data: decodedText };

  }catch(err){
    return { isSuccess: false, error: err };
  }
  
};
