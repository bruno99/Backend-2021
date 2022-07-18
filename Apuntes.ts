//-----------------

type Person = {
    nombre: string;
    edad: number;
    perro?: string;
    pareja?: Person,
}

const persona1: Person = {
    nombre: "Bruno",
    edad: 22,
    perro: "Arya",
    pareja :{
        nombre: "Carlota",
        edad: 21,
    }
}
const printDeep = (p:Person): void =>{
Object.keys(p).forEach ( (k: string)=>{
    if(k!== "pareja") console.log(`${k}: ${(p as any)[k]}`);
    else{
        console.log(k);
        if(p.pareja)printDeep(p.pareja);
    }
}); 
}
printDeep(persona1);
console.log(typeof [1,2,3]);
const printDep = (p: any): void => {
    if(!Array.isArray(p) && typeof(p)!== "object"){
        console.log(p);
    }else{
        Object.keys(p).forEach( (k:string)=> {
            if(Array.isArray(p[k])){
                p[k].forEach((o: Object) => printDep(o));
            }
            else if(p[k]=== "object"){
                console.log(k);
                printDep(p[k]);
            }else{
                console.log(`${k}: ${(p as any)[k]}`);
            }
        });
    }
}
printDep(persona1);

//---------------------------------
console.log("start");
//Una promesa es que cuando yo programo en JS me promete que va a hacer algo, y al final del programa se hace esa promesa
//esto me promete que algo va a ser un string en algún momento (puede o no cumplirse)
//si se cumple hace lo que tiene que hacer, y si no ha pasasado algo
const a: Promise<string> = new Promise ((resolve, reject) => {
    setTimeout(
        () =>{console.log("dentro del timeout")}
        , 1000
        ); //stetimeout es como un wait 
});//la promesa resuelve con un string
console.log("tres");
//cuando se resuelva coge el valor con el que se ha resuelto y damelo por pantalla
a.then(valor_resuelto => console.log(valor_resuelto));
console.log("finish");
//EJEMPLO CON REJECT
console.log("start");
//reject controlado 
new Promise((resolve, reject) => {
    reject("error");
}).then(valor_resuelto => console.log(valor_resuelto)).
    catch(e => console.log(`error: ${e}`));

console.log("tres");


console.log("finish");

