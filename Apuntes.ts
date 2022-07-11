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
