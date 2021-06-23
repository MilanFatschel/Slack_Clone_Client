import IChannel from "./IChannel";

export default interface ITeam {
    id: number,
    name: string,
    channels: IChannel[]
}