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
//--------------------------------
console.log("start");
//es asincrono, es decir que par dar la vuelta no espera y sale todos los números de golpe
for(let i:number =0; i<10; i++){
  setTimeout(()=>{
    console.log(i)
}, 1000);
}
//--------------------------------
let coordenadas: string = "";
//me devuelce una promesa que resuelve con un string 
const pedir_gps = (direccion: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => resolve ("Las coordenadas GPS"), 1000);
    })
}

const pedir_tiempo = (coordenadas_gps: string) => {
    return new Promise<string>(resolve => {
        setTimeout(() => resolve ("El tiempo"), 1000);
    })
}
//llamo a la funcion y cuando lo resuelve asigna el valor resuelto a coordenadas
//tengo que esperar a las coordenadas para poder pedir el tiempo (encadenado)
pedir_gps("mi_direccion")
.then((r) => pedir_tiempo(r))
.then(s=> console.log(s));
//asi no se puede hacer porque no tenemos coordenadas aún, hay que hacerlo como arriba
pedir_tiempo(coordenadas).then(s => console.log(`el tiempo es ${s}`));
//---------------------------------
//Array de promesas que me resuelven con una cadena de texto
const arrProm: Array<Promise<string>> = [];
//lleno el array de promesas
arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 1"), 3000)));
arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 2"), 2000)));
arrProm.push(new Promise<string>(
    resolve => setTimeout(() => resolve("promesa 3"), 1000)));

//cuando se resuelvan todas las promesas de este array capturame el resultado
Promise.all(arrProm).then((res:Array<string>) => {
    res.forEach(r => console.log(r)); //en 3 segundos se imprimen promesas 1 2 3 en orden en el que yo envío
})



