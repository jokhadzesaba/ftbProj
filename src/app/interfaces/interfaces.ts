export interface Stadium{
    ball:boolean,
    light:boolean,
    people:number,
    reservetions:Reservetion[]
}
interface Reservetion{
    phoneNumber:string,
    people:number,
    ball:boolean,
    description:string,
    date:Date,
    hour:number,
}