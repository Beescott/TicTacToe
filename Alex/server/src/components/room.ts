import { Player } from './player';
import { Board } from './board';
import { BoardElement } from './boardElement';

export class Room {
    private _id: string;
    private _players: Array<Player>;
    private _board: Board;
    private _playerTurn: number;

    constructor(id: string) {
        this._id = id;
        this._players = new Array<Player>(2);
        this._board = new Board();
        this._playerTurn = 0;

        this.logBoard();
    }

    public logBoard() {
        for (let i = 0; i < 9; i += 3) {
            let res: string = "";
            for (let j = 0; j < 3; j++) {
                res += this._board.getBoardElement(i + j) + " ";
            }
        }
    }

    public addPlayer(p: Player): boolean {
        if (this._players.length == 2)
            return false;
        
        this._players.push(p);
        return true;
    }
}