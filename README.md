# Oystr

## Installation
First, make sure you have the latest version of NodeJS installed.

Go to each folder (client and server) and run the command:

``npm install``

This command will install all dependencies.

## Client

To run the client in development mode, just execute the following command:

``npm start``

If you want to run in production mode, first you have to build it. To build the client, run the following command:

``npm run build``

After the build is finished, serve the build file with any http server you like.

## Server

To run the server in development mode, you have to execute 2 commands, first, you have to build typescript and watch for any changes. To do that, run the following command:

``npm run tsc``

Don't close the terminal window, open on more terminal and run the following command:

``npm start``

If you want to run in production mode, you just have to build the typescript and serve with any http server you like.
To build the typescript, just execute the command:

``npm run build``

Then serve the dist folder with any http server.