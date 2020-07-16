import { Room } from "./room";

export class Player {
    private _socketID: string;
    private _name: string;
    private _room: Room | undefined;

    constructor(socketID: string, name: string, room?: Room) {
        this._socketID = socketID;
        this._name = name;
        this._room = room;
    }

    public logPlayer(): void {
        console.log("name: %s, id: %s", this._name, this._socketID);
    }

    public getSocketID(): string {
        return this._socketID;
    }

    public getRoom(): Room | undefined {
        return this._room;
    }

    public setRoom(room: Room): void {
        this._room = room;
    }
}