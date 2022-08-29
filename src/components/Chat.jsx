import React, { useEffect } from "react";
import styled from "styled-components";
import socketio from 'socket.io-client';
import { useNavigate } from "react-router-dom";

function Chat() {

    const socket = socketio.connect('http://localhost:3000/api/room/random'); //백서버
    const navigate = useNavigate();

    // socket.emit("login", {
    //     name: "name1",
    //     userid: "ungmo2@gmail.com"
    //   });
  
    //   // 서버로부터의 메시지가 수신되면
    //   socket.on("login", function(data) {
    //     $("#chatLogs").append("<div><strong>" + data + "</strong> has joined</div>");
    //   });
  
    //   // 서버로부터의 메시지가 수신되면
    //   socket.on("msg", function(data) {
    //     $("#chatLogs").append("<div>" + data.msg + " : from <strong>" + data.from.name + "</strong></div>");
    //   });

    return (
        <div class="container">
            <h3>Socket.io Chat Example</h3>
            <form class="form-inline">
                <div class="form-group">
                    <label for="msgForm">Message: </label>
                    <input type="text" class="form-control" id="msgForm"/>
                </div>
                <button type="submit" class="btn btn-primary">Send</button>
            </form>
            <div id="chatLogs"></div>
        </div>
    );
}

export default Chat