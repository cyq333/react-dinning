/**
 * Created by oyx on 2016/1/18.
 */
export default function( action, url, data, callback)  {

    var xhr = new XMLHttpRequest()
    xhr.open(action, url, true)
    xhr.withCredentials = true
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = function(){
        if ((xhr.readyState == XMLHttpRequest.DONE) && (xhr.status == 200)) {
            if(!!callback){
                callback(JSON.parse(xhr.responseText))
            }
        }
    }
    xhr.send(JSON.stringify(data))
}
