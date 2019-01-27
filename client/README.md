Client
======

The client is responsible for
 * knowing what session and starting seqno to consume
 * initiating the connection
 * maintaining the connection from the client pov
 * detecting server liveliness
 * reading / parsing session messages.


Operation
---------

From the root folder...

```
$ node ./client/example/client.js
client connected
27 Jan 00:06:44 - dataA
27 Jan 00:06:44 - heard login accepted message.
27 Jan 00:06:44 - dataS
27 Jan 00:06:44 - heard sequenced message.S1

27 Jan 00:06:44 - dataS
27 Jan 00:06:44 - heard sequenced message.S2

27 Jan 00:06:44 - dataS
```




