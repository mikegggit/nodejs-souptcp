NodeJS implementation of SoupTCP protocol
=========================================
A NodeJS implementation of the SoupTCP protocol.

Motivation
----------
I find socket programming fun, and having worked with the SoupTCP protocol quite a bit at work, find it a familiar one to tackle when learning new languages.  Here, I'm using NodeJS to implement the protocol.

Goals
-----
 * Play around with the ecosystem
 * Understand the package manager
 * Experiment w/ the node socket API's
 * Experiment w/ some ES6 / ES7 API's

SoupTCP
-------
SoupTCP is a client / server messaging protocol used in the financial industry.

See https://www.nasdaqtrader.com/content/technicalsupport/specifications/dataproducts/souptcp.pdf for the complete specification.

The protocol allows information to be made available from a server application via TCP connection to clients.  Outside of the protocol messages governing connection management and login management, it is a one way protocol from server to client.

Information delivered over the protocol is in either ascii or binary format.

General Concepts
----------------
A brief definition of core SoupTCP concepts will be useful.

# Session
Represents a logical collection of messages.  In the financial worls, a session often corresponds to a trading session.  A session is assigned an identifier and "contains" messages.  Typically there is an active session corresponding to the current date.  In the event a prior date's session is desired by clients, the server can be configured to service an older session.

# Connection
A connection represents a client that has connected to a server socket, both of which are actively exchanging heartbeats.

# Store
While not a part of the spec, is useful to understand where messages being "dropped" by the server to clients originate from.  Messages in a store are considered sequenced, and deterministically ordered such that in the event of a disconnect and reconnect, messages will be delivered in the same order all other things considered.

# Stream
The messages published by the server to connected client.  Clients can request all messages in a stream, or instead only messages starting at a certain sequence number.


Data
----
How data is formatted, encoded and parsed is outside the scope of the SoupTCP protocol.  If messages are encoded in a way requiring parsing and further processing on the client, the client will obtain a copy of the full message specification being used by the server and code its ingestion process accordingly so that each message is parsed and decoded appropriately.  


Installation
------------
Install Node / NPM
https://nodejs.org/en/download/

Use a version later than 9.0 of node to ensure ES6/7 features are supported.

Install dependencies

From the root folder:
```npm install```


Create documentation
--------------------
jsdoc [filename]



