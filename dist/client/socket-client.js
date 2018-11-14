var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as socketio from 'socket.io-client';
import { SocketMixin } from '../lib/socket-mixin';
/**
 * Basic socket client that can be used in Node or in the browser.
 */
var SocketClient = /** @class */ (function (_super) {
    __extends(SocketClient, _super);
    function SocketClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Socket.io Socket instance for internal use.
         */
        _this.socket = null;
        return _this;
    }
    /**
     * Sets up the socket handlers for the client.
     */
    SocketClient.prototype.attachSocketHandlers = function () {
        var _this = this;
        // Build context for all handlers
        var ctx = {
            socket: this.socket,
            client: this
        };
        var _loop_1 = function (event) {
            this_1.socket.on(event, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.handleEvent.apply(_this, [ctx, event].concat(args));
            });
        };
        var this_1 = this;
        // Setup listeners for each event
        for (var event in this.socketHandlers) {
            _loop_1(event);
        }
    };
    /**
     * Returns whether or not the client has an active socket connection.
     */
    SocketClient.prototype.isConnected = function () {
        return (this.socket !== null) && this.socket.connected;
    };
    /**
     * Returns the socket id if the client is connected.
     */
    SocketClient.prototype.getSocketId = function () {
        if (this.isConnected())
            return this.socket.id;
        else
            throw new Error('The client must first be connected to get the socket id');
    };
    /**
     * Attempts to connect to a SocketServer.
     */
    SocketClient.prototype.connect = function (url, waitFor, options) {
        if (url === void 0) { url = ''; }
        if (waitFor === void 0) { waitFor = null; }
        if (!options)
            options = {};
        Object.assign(options, {
            autoConnect: false
        });
        this.socket = socketio(url, options);
        this.attachSocketHandlers();
        this.socket.open();
        if (typeof waitFor === 'string')
            return this.blockEvent(waitFor);
    };
    /**
     * Disconnects from the SocketServer, if there was a connection.
     */
    SocketClient.prototype.disconnect = function () {
        if (this.socket)
            this.socket.close();
        this.socket = null;
    };
    /**
     * Emits an event to the connected SocketServer.  TypeScript ensures that the event adheres to the API description.
     */
    SocketClient.prototype.emit = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var _a;
        (_a = this.socket).emit.apply(_a, [event].concat(args));
    };
    /**
     * Handles a Response that requires a reply.
     */
    SocketClient.prototype.reply = function (ctx, response) {
        var _a;
        (_a = this.socket).emit.apply(_a, [response.name].concat(response.args));
    };
    return SocketClient;
}(SocketMixin));
export { SocketClient };
