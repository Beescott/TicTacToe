export enum SocketEvent{
    CONNECT = 'connection',
    DISCONNECT = 'disconnect',
    CREATE_ROOM = 'create_room',
    JOIN_ROOM = 'join_room',
    ADD_USER = 'add_user',
    SERVER_MESSAGE = 'server_message',
    PLAYER_TURN = 'player_turn',
    UPDATE_BOARD = 'update_board',
    BOARD_RESULT = 'board_result'
}