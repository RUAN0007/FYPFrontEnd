function containChinese(s){  
            var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;  
            if(!patrn.exec(s)){  
            	return false;  
            }  
            else{  
            	return true;  
            }  
}  

function cap(str){
	str = str.toLowerCase();
	 var reg = /\b(\w)|\s(\w)/g; //  \b判断边界\s判断空格
	 return str.replace(reg,function(m){ 
	  return m.toUpperCase()
	 });
	 return str;
}