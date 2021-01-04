import express from 'express';
import { buildSchemaSync } from 'type-graphql';
import { connectMongoose } from './database/mongoose';
import { UserResolver } from './module/user/user.resolver';
import {MessageResolver} from './module/messages/message.resolver';
import { createServer } from 'http'
import { ApolloServer } from 'apollo-server-express';

const schema = buildSchemaSync({
    resolvers: [UserResolver, MessageResolver],
});

const app = express();
const server = new ApolloServer({
    schema
})

server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;
// put here all async methods that need to execute before the app can work
export async function appBootstrap() {
    await connectMongoose();
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
    })
}
