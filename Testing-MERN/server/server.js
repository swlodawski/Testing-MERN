const express = require('express');
const { ApolloServer} = require('@apollo/server');
const { expressMiddleware} = require('@apollo/server/express4');
const path = require('path');

const { typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startApolloServer = async () => {
    await server.start();

    app.use(express.urlencoded({ extended: false}));
    app.use(express.json());

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.use('/graphql', expressMiddleware(server));

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Listening on post ${PORT}`);
        console.log(`Use graphql at http://localhost: ${PORT}/graphql`);
    });
});
};

startApolloServer();