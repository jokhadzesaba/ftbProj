export interface Stadium{
    light:boolean,
    open:number,
    basketball:boolean,
    recomendedPlay:string,
    reservetions:Reservetion[],
    joined:Join[]
}
export interface Reservetion{
    phoneNumber:string,
    people:number,
    ball:boolean,
    message:string,
    date:Date,
    avarageAge:number,
}
export interface Join{
    joinDate:Date,
    ball:boolean,
    people:number,
    avarageAge:number,
    phoneNumber:string,
    message:string,

}