Server
======

The server establishes the server-socket bind port and is responsible for
 * session registration
 * publishing the server socket
 * knowing valid loginsa
 * servicing client connection requests
 * login negotiation
 * publishing of sequenced stream messages


Operation
---------
From the root...

Start the server

```
$ node ./server/example/testServer.js
Starting to listen on port 9000.
TCP server has been set up on localhost and listening on port 9000
```
---

By default, the server listens on port 9000 and mounts a single session called "testing".  For a client to successfully request a specific session, the server must "mount" it.  The implementation will eventually support a current session and any number of archived sessions, each associated w/ a name that a client can reference in a login request.

