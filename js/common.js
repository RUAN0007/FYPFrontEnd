function containChinese(s){  
            var patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;  
            if(!patrn.exec(s)){  
            	return false;  
            }  
            else{  
            	return true;  
            }  
}  


function sleep(obj,iMinSecond) 
 {  
  if (window.eventList==null)  
  window.eventList=new Array();  
  var ind=-1; 
  for (var i=0;i<window.eventList.length;i++) 
  {   
   if (window.eventList[i]==null)  
   {  
    window.eventList[i]=obj;    
    ind=i;   
    break;   
   }  
  }  
  if (ind==-1) 
  {   
   ind=window.eventList.length;   
   window.eventList[ind]=obj; 
  }  
  setTimeout("GoOn(" + ind + ")",iMinSecond); 
 } 
 function GoOn(ind) 
 {  
  var obj=window.eventList[ind]; 
  window.eventList[ind]=null; 
  if (obj.NextStep) obj.NextStep(); 
  else obj(); 
 } 