import { IUser } from "./IUser";

export default interface IMessage {
    id: number,
    user: IUser,
    created_at: Date,
    text: string
}