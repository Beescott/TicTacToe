import { Player } from './player';
import { Board } from './board';

export class Room {
    private _players: Array<Player>;
    private _board: Board;
    private _playerTurn: number;

    constructor() {
        this._players = new Array<Player>(2);
        this._board = new Board();
        this._playerTurn = 0;
    }
}