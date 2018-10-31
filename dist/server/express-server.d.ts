/// <reference types="node" />
import * as http from 'http';
import * as core from 'express-serve-static-core';
import { HttpServer, HttpServerConfig } from './http-server';
import { HttpHandlers, HttpInterface } from '../interface/http-interface';
/**
 * Defines how an ExpressServer may be configured.
 */
export declare type ExpressServerConfig<API extends HttpInterface> = {
    expressConfig?: (expressApp: core.Express, server: ExpressServer<API>) => void;
    serveStaticDir?: string | null;
} & HttpServerConfig;
/**
 * Describes the shape of the `this` context that will be available in every ExpressServer handler.
 */
export declare type HandlerCtx<API extends HttpInterface> = {
    req: any;
    res: any;
    server: ExpressServer<API>;
};
/**
 * A simple HTTP server built on Express, with an API protected by TypeScript.
 *
 * It should be noted that although this server is powered by Express, little effort is made to elegantly wrap around
 * the numerous features that Express provides.  The goal of this server is to provide basic bootstrapping for express
 * and to implement an interface that can also be implemented by an ExpressClient to ensure that both communicate with
 * each other properly.
 */
export declare abstract class ExpressServer<API extends HttpInterface> extends HttpServer {
    /**
     * Defines how the server should react to each request.
     */
    protected abstract httpHandlers: HttpHandlers<API, HandlerCtx<API>>;
    /**
     * Constructs a new ExpressServer.
     */
    constructor(options?: ExpressServerConfig<API>);
    /**
     * Default configuration values for all ExpressServers.
     */
    getDefaultConfig(): HttpServerConfig;
    /**
     * Override to allow the options object to be of type ExpressServerConfig.
     */
    configure(options: ExpressServerConfig<API>): this;
    /**
     * Configures an Express instance and attaches it to the given httpServer.
     */
    protected setup(httpServer: http.Server): void;
    /**
     * Performs any necessary cleanup.
     */
    protected takedown(): void;
}