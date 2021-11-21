import { Request, Response } from "express";
import { Db } from "mongodb";
import { Bookings, NewUser } from "./types";


const checkDateValidity = (
  day: string,
  month: string,
  year: string
): boolean => {
  const date = new Date(`${month} ${day}, ${year}`);
  return date.toString() !== "Invalid Date";
};

export const status = async (req: Request, res: Response) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  res.status(200).send(`${day}-${month}-${year}`);
};

//SIGNIN
export const signin = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const user = await db.collection("Users").findOne({
    email: (req.body.email)
  }) as Db;
  if (user!= null)
  {
    return res.status(409).send("User already registered");
  }
  const newUser: NewUser = {
    email: (req.body.email),
    password: (req.body.password),
    token: (req.body.token)
  };
  const chars = await db.collection("Users").insertOne(newUser).then((elem: any) => {
    return res.status(200).send(`User registered`);
  }).catch((error: any) => {
    return res.status(500).send(`\nError:${error}`);
  });

}

//LOGIN
export const login = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");

  const user: NewUser = await db.collection("Users").findOne({
    email: (req.body.email),
    contraseña: (req.body.contraseña),
    token: (req.boy.token)
  }) as NewUser;

  if (user) {
    const tok = user.token;
    set(tok);
    return res.status(200).send(`User logged in, token ${tok}`);
  } else {
    return res.status(401).send("User NOT logged");
  }
}

//LOGOUT
let token: any;
export const getToken = () => {
  return token;
}
export const set = (token_: any) => {
  token = token_;
}
export const logout = async (req: Request, res: Response) => {

  set(undefined);
  if (getToken() == undefined) {
    return res.status(200).send("User logged out");
  } else {
    return res.status(500).send("User NOT logged out")
  }

}

//FREESEATS
export const freeSeats = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("seats");

  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { day, month, year } = req.query as {
    day: string;
    month: string;
    year: string;
  };

  if (!day || !month || !year) {
    return res.status(500).send("Missing day, month or year");
  }

  if (!checkDateValidity(day, month, year)) {
    return res.status(500).send("Invalid day, month or year");
  }

  const seats = await collection.find({ day, month, year }).toArray();

  const freeSeats = [];
  for (let i = 1; i <= 20; i++) {
    if (!seats.find((seat) => parseInt(seat.number) === i)) {
      freeSeats.push(i);
    }
  }
  return res.status(200).json({ free: freeSeats });
};

//BOOK
export const book = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("seats");
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { day, month, year, number } = req.query as {
    day: string;
    month: string;
    year: string;
    number: string;
  };

  if (!day || !month || !year || !number) {
    return res.status(500).send("Missing day, month or year or seat number");
  }

  if (!checkDateValidity(day, month, year)) {
    return res.status(500).send("Invalid day, month or year");
  }

  const notFree = await collection.findOne({ day, month, year, number });
  if (notFree) {
    return res.status(500).send("Seat is not free");
  }

  const token = collection.findOne();
  await collection.insertOne({ day, month, year, number, token });
  return res.status(200).json({ token });
};

//FREE
export const free = async (req: Request, res: Response) => {
  const db: Db = req.app.get("db");
  const collection = db.collection("seats");
  if (!req.query) {
    return res.status(500).send("No params");
  }

  const { day, month, year } = req.query as {
    day: string;
    month: string;
    year: string;
  };

  const token = req.headers.token;

  if (!day || !month || !year || !token) {
    return res
      .status(500)
      .send("Missing day, month or year or seat number or token");
  }

  if (!checkDateValidity(day, month, year)) {
    return res.status(500).send("Invalid day, month or year");
  }

  const booked = await collection.findOne({ day, month, year, token });
  if (booked) {
    await collection.deleteOne({ day, month, year, token });
    return res.status(200).send("Seat is now free");
  }

  return res.status(500).send("Seat is not booked");
};

//MYBOOKINGS
export const mybookings = async (req:Request, res:Response)=>{
  const db: Db = req.app.get("db");

  let puest: Bookings[] = (await db.collection("bookings").find({ 
    token:req.headers.token 
  }).toArray() as Bookings[]);
  const today = new Date();
  //bookings list
  for(let i=0; i<puest.length; i++){
    let date = new Date(`${puest[i].year}-${puest[i].month}-${puest[i].day}`);
    if(date.toDateString()<=today.toDateString()){
      puest.filter(elem=> elem !== puest[i]);
    }
  }
  if(puest.length === 0){
    return res.status(404).send("No future bookings")
  }else{
    return res.status(200).send(puest);
  }
}