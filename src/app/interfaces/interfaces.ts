export interface Stadium{
    light:boolean,
    open:number,
    basketball:boolean,
    recomendedPlay:string,
    reservetions:Reservetion[],
    joined:Join[],
    }
export interface Reservetion{
    phoneNumber:string,
    people:number,
    ball:boolean,
    message:string,
    date:string,
    hour:string,
    avarageAge:string,
    password:string

}
export interface Join{
    joinDate:Date,
    ball:boolean,
    people:number,
    avarageAge:string,
    phoneNumber:string,
    message:string,
    password:string


}