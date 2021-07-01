import { IUser } from "./IUser";

export default interface IMessage {
    id: number,
    user: IUser,
    created_at: string,
    text: string
}