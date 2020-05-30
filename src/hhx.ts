interface Player {
  id: number;
  name: string;
  team: number;
  admin: boolean;
  position: object;
  auth: string;
  conn: string;
}

interface Room {
  onRoomLink: object;
}

class HHX {
  room: Room;
  data: object[];
  token: string;
  uri: string;
  roomLink: string;

  /**
   * @param room - Room object.
   * @param token - Connect in-app.
   */
  constructor(room: Room, token: string) {
    this.room = room;
    this.data = [];
    this.token = token;
    this.uri = "https://haxballheadlessx.herokuapp.com";
    this.roomLink = "";
    const xhr = new XMLHttpRequest();

    this.room.onRoomLink = (link: string) => {
      xhr.open("POST", this.uri + "/setdata");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify({ value: "link", link, token }));
    };
  }

  /**
   * @public
   * @returns - Player data that has entered the room before.
   */
  public getAnalysis() {
    return this.data;
  }

  /**
   * @returns - Room link.
   */
  public getRoomLink() {
    return this.roomLink;
  }

  /**
   *
   * @param player - Player object.
   * @param define - Set whether the player joined or left.
   */
  public connectData(player: Player, define: boolean) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", this.uri + "/setdata");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(
      JSON.stringify({
        value: "onlineUsers",
        define,
        token: this.token,
        user: {
          name: player.name,
          conn: player.conn,
          auth: player.auth,
          id: player.id,
        },
      })
    );

    this.data.push({
      name: player.name,
      conn: player.conn,
      auth: player.auth,
      id: player.id,
    });
  }
}
