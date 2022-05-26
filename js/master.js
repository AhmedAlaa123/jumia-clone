/* 
  -- method is method type [get,post,put,delete]
  -- url  is The Url The Make Http Request On It
  -- IsAsync [ true | False]
  -- action is The Method Will be calling when The Data is had getten from the Server
  this method is genaric for all requests
*/
function getData(method,url,isAsaync ,action)
{
    var Xhttp = new XMLHttpRequest();
    
    // add event
    Xhttp.onreadystatechange=function(event){
        // console.log(event)
        if(this.readyState===4&&this.status==200)
        {
           var items=JSON.parse(this.responseText)
           action(items)
         
        }
    }

    //open connection
    Xhttp.open(method,url,isAsaync);
    // Send Request
    Xhttp.send();
}