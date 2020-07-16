import { SocketEvent } from './constants';
import { Room } from './components/room';
import {Player} from './components/player';
import { BoardElement } from './components/boardElement';

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
                console.log('[ADD USER] Adding a user');
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
                thisPlayer.setRoom(newRoom);
                this.rooms.push(newRoom);
            });

            socket.on(SocketEvent.JOIN_ROOM, (data: string) => {
                console.log('[JOIN ROOM] player joining room');
                let room: Room | undefined = this.getRoomFromID(data);
                let player: Player | undefined = this.getPlayerFromSocketId(socket.id);

                if (!room || !player)
                    return;
                
                room.addPlayer(player);
                player.setRoom(room);

                room.logPlayers();
            });

            socket.on(SocketEvent.PLAYER_TURN, (data: number) => {
                let player: Player | undefined = this.getPlayerFromSocketId(socket.id);
                let room: Room | undefined = player?.getRoom();
                
                if (!player || !room)
                    return;
                
                if (player?.getRoom()?.playerTurn(player, data)) {
                    let playersInRoom: Array<Player> = room.getPlayers();
                    for (let i:number = 0; i < playersInRoom.length; i++) {
                        this.socketHandler.to(playersInRoom[i].getSocketID()).emit(SocketEvent.UPDATE_BOARD, room.getBoard());
                    }

                    let winCondition: BoardElement | undefined = room.winCondition();
                    if (winCondition != undefined) {
                        this.socketHandler.to(playersInRoom[0].getSocketID()).emit(SocketEvent.BOARD_RESULT, winCondition);
                        this.socketHandler.to(playersInRoom[1].getSocketID()).emit(SocketEvent.BOARD_RESULT, winCondition);
                    }
                }
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

    private getRoomFromID(id: string): Room | undefined {
        let resRoom: Room | undefined = undefined;
        this.rooms.forEach(room => {
            if (room.getID() == id)
                resRoom = room;
        });

        return resRoom;
    }
}