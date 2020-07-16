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
        this._players = new Array<Player>();
        this._board = new Board();
        this._playerTurn = 0;

        this.logBoard();
    }

    public getID(): string {
        return this._id;
    }

    public logBoard() {
        for (let i = 0; i < 9; i += 3) {
            let res: string = "";
            for (let j = 0; j < 3; j++) {
                res += this._board.getBoardElement(i + j) + " ";
            }
            console.log(res)
        }
    }

    public addPlayer(p: Player): boolean {
        if (this._players.length == 2)
            return false;

        this._players.push(p);
        return true;
    }

    public playerTurn(p: Player, boardIndex: number): boolean {
        // get player index
        let playerIndex: number = this._players.findIndex(player => player.getSocketID() == p.getSocketID());

        // if player is not in room array
        if (playerIndex == undefined)
            return false;

        // if the board index is out of bounds
        if (boardIndex > 9 || boardIndex < 0)
            return false;

        // if not player turn
        if (playerIndex != this._playerTurn)
            return false;

        // set board element
        if (this._board.getBoardElement(boardIndex) == BoardElement.None) {
            let boardElement = this._playerTurn == 0 ? BoardElement.X : BoardElement.O;
            this._board.setBoardElement(boardIndex, boardElement);

            // alternate between 0 and 1
            this._playerTurn = 1 - this._playerTurn;
        }
    
        this.logBoard();
        return true;
    }

    public winCondition(): BoardElement | undefined {
        // check all columns
        for (let i: number = 0; i < 3; i++) {
            if (this._board.getBoardElement(i) == this._board.getBoardElement(i + 3) &&
                this._board.getBoardElement(i + 3) == this._board.getBoardElement(i + 6)) {
                return this._board.getBoardElement(i);
            }
        }

        // check all rows
        for (let i: number = 0; i < 7; i += 3) {
            if (this._board.getBoardElement(i) == this._board.getBoardElement(i + 1) &&
                this._board.getBoardElement(i + 1) == this._board.getBoardElement(i + 2)) {
                return this._board.getBoardElement(i);
            }
        }

        // check diags
        if (this._board.getBoardElement(0) == this._board.getBoardElement(4) &&
            this._board.getBoardElement(4) == this._board.getBoardElement(8))
            return this._board.getBoardElement(0);

        if (this._board.getBoardElement(2) == this._board.getBoardElement(4) &&
            this._board.getBoardElement(4) == this._board.getBoardElement(6))
            return this._board.getBoardElement(2);

        // check if all board element are played
        for (let i = 0; i < 9; i++) {
            if (this._board.getBoardElement(i) == BoardElement.None)
                return undefined;
        }

        // if all board elements are played, then no winner
        return BoardElement.None;
    }

    public logPlayers(): void {
        console.log('players in room %s:', this._id);
        this._players[0].logPlayer();
        this._players[1].logPlayer();
    }

    public getPlayers(): Array<Player> {
        return this._players;
    }

    public getBoard(): Board {
        return this._board;
    }
}