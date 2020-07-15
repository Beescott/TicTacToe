export class Player {
    private _socketID: string;
    private _name: string;

    constructor(socketID: string, name: string) {
        this._socketID = socketID;
        this._name = name;
    }

    public logPlayer(): void {
        console.log("name: %s, id: %s", this._name, this._socketID);
    }

    public getSocketID(): string {
        return this._socketID;
    }
}