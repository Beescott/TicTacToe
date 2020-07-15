import { BoardElement } from './boardElement';

export class Board {
    private _board: Array<BoardElement>;

    constructor() {
        this._board = new Array<BoardElement>(9);
        for (let index = 0; index < this._board.length; index++) {
            this._board[index] = BoardElement.None;            
        }
    }

    public getBoardElement(index: number): BoardElement {
        return this._board[index];
    }

    public setBoardElement(index: number, boardElement: BoardElement): boolean {
        if (this._board[index] != BoardElement.None)
            return false;
        
        this._board[index] = boardElement;
        return true;
    }
}