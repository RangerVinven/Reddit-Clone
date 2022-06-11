const { ApolloServer, gql } = require("apollo-server");

// Type definations
const typeDefs = gql`
    type User {
        ID: ID!
        username: String!
        password: String!
        email: String!
        dateCreated: date!
        isAdmin: Boolean!
        sessionToken: String
        upvotedPosts: [Post]
        upvotedComments: [Comments]
        managedSubreddits: [Subreddit]
    }

    type Subreddit {
        ID: ID!
        name: String!
        mods: [User]!
        dateCreated: date!
        posts: [Post]
    }

    type Post {
        ID: ID!
        title: String!
        body: String!
        poster: User!
        datePosted: date!
        upvotes: int!
        comments: [Comment]
    }

    type Comment {
        ID: ID!
        body: String!
        commenter: User!
        upvotes: int!
        dateCommented: date!
        replies: [Comment]
    }

    type Query {
        addUser(username: String!, password: String!, email: String!): User
        getUser(id: ID!): User
        loginUser(username: String!, password: String!): String # Returns the session token (if the credentials are correct)
        deleteUser(id: ID!): Boolean!

        addSubreddit(name: String!, creator: User!, dateCreated: date!): Subreddit
        getSubreddit(id: ID!): Subreddit
        deleteSubreddit(id: ID!): Boolean!

        addPost(title: String!, body: String!, poster: User!, datePosted: date!): Post
        getPost(id: ID!): Post
        deletePost(id: ID!): Boolean!

        addComment(postID: int!, body: String!, commenter: User!): Comment
        getComment(id: ID!): Comment
        editComment(postID: int!, body: String!)
        deleteComment(ID: ID): Boolean!

        addUpvote(postID: ID, commentID: ID): Boolean
        hasUpvoted(userID: ID!, postOrCommentID: ID!): Boolean # Returns true if the comment/post has been upvoted by the user
    }
`

// Resolvers
const resolvers = {
    
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen({port: 3000}).then(() => {
    console.log("Server running on https://localhost:3000 🚀");
});