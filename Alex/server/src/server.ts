import {createServer, Server} from 'http';
import * as io from 'socket.io';
import {SocketController} from './socketController';
import {Room} from './components/room';

export class SocketServer {
    public static readonly PORT:number = 2222;
    private socketController:SocketController;
    private httpConnection:Server;
    private socketHandler:SocketIO.Server;

    private _rooms:Array<Room>;

    constructor() {
        this.httpConnection = createServer();
        this.socketHandler = io(this.httpConnection);
        this.socketController = new SocketController(this.socketHandler);

        this._rooms = new Array<Room>();
        this.listen();
    }

    private listen() : void {
        this.httpConnection.listen(SocketServer.PORT, () => {
            console.log("Server listening at port %d", SocketServer.PORT);
        });
    }
}