export class Player {
    private _socketID: string;
    private _name: string;

    constructor(socketID: string, name: string) {
        this._socketID = socketID;
        this._name = name;
    }
}