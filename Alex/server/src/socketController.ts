import { SocketEvent } from './constants';
import { Room } from './components/room';
import {Player} from './components/player';

export class SocketController {
    private socketHandler: SocketIO.Server;
    private rooms: Array<Room>;
    private players: Array<Player>;

    constructor(handler: SocketIO.Server) {
        this.socketHandler = handler;
        this.rooms = new Array<Room>();
        this.players = new Array<Player>();
        this.listen();
    }

    private listen() {
        this.socketHandler.on(SocketEvent.CONNECT, (socket: any) => {
            console.log("New player connected!");
            
            socket.on(SocketEvent.ADD_USER, (data: string) => {
                let newPlayer = new Player(socket.id, data);
                newPlayer.logPlayer();

                this.players.push(newPlayer);
            });

            socket.on(SocketEvent.CREATE_ROOM, (data: string) => {
                console.log('[CREATE ROOM] Creating a room');
                let newRoom = new Room(data);
                let thisPlayer = this.getPlayerFromSocketId(socket.id);
                if (thisPlayer == undefined) {
                    console.log('[CREATE ROOM] Player not found when creating a room');
                    return;
                }
                newRoom.addPlayer(thisPlayer);

                this.rooms.push(newRoom);
            });
        });
    }

    private getPlayerFromSocketId(socketID: string): Player | undefined {
        let resPlayer: Player | undefined = undefined;
        this.players.forEach(player => {
            if (socketID == player.getSocketID()) {
                resPlayer = player;
            }
        });

        return resPlayer;
    }
}