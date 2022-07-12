import { type } from "os";
import { json } from "stream/consumers";
//probar distintos tipos de variables
const variable ={
    a: "texto",
    b: [1,2,3],
    d: {
        e: [{x: 1, y:2}, 4, {j:3, i: 5}]
    },
    f: true   
}

const toString=(parameter:any):String=>{
        var ret:String="";
        //string, numero o boolean
        if(!Array.isArray(parameter) && typeof(parameter) !== "object") {
            if(typeof(parameter)=="string"){
                return ("\""+String(parameter)+"\"");
            }else if(typeof(parameter)=="number"){
                return String(parameter);
            }else if(typeof(parameter)=="boolean"){
                return String(parameter);
            }
        }else {
            //array
            if(Array.isArray(parameter)){
                ret+="["
                for (var i = 0; i < parameter.length; i++) {
                    if(i===parameter.length-1){
                        ret+=String(toString(parameter[i]))
                    }else{
                        ret+=(String(toString(parameter[i]))+",");
                    }
                }
                ret+="]";
            }else if(typeof(parameter)=="object"){ 
                ret+="{";
            Object.keys(parameter).forEach((key:string) => {
                if(key===Object.keys(parameter)[Object.keys(parameter).length-1]){
                    ret+=("\""+String(key)+"\":"+toString(parameter[key]));
                }else{
                    ret+=("\""+String(key)+"\":"+toString(parameter[key])+",");
                }
            });
            ret+="}";
            }
        }

        return ret;
}
console.log(JSON.stringify(variable));
console.log(toString(variable));

//Se debe incluir esta linea en el codigo:
if(toString(variable)==JSON.stringify(variable)){
    console.log("Ejercicio 1 funciona");
}else{
    console.log("Ejercicio 1 no funciona");
}


