const typeDefs = `
    type Thought {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
    }
    
    type Comment {
    _id: ID
    commentText: String
    createdAt: String}
    
    typeQuery {
    thoughts: [Thought]!
    thought: (thoughtId: ID!): Thought}
    
    type Mutation {
    addThought(thoughtText: String!, thoughtAuthor: String!): Thought
    addComment(thought: ID!, commentText: String!): Thought
    removeThought(thoughtId: ID!): Thought
    removeComment(thoughtId: ID!, commentId: ID!): Thought}`;

    module.exports = typeDefs;