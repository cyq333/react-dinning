
export default function( method, url, callback, params){
    var xhr = new XMLHttpRequest()
    xhr.open(method, url, true)
    xhr.withCredentials = true
    xhr.send()
    xhr.onreadystatechange = function(){
        if((xhr.readyState == XMLHttpRequest.DONE) && (xhr.status == 200)){
            if (!!params && params.raw) {
                callback(xhr.responseText,xhr.getResponseHeader('ETag'))
            } else {
                callback(JSON.parse(xhr.responseText))
            }
        }
    }
}
