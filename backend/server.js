const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { decodeBase64 } = require("bcryptjs");
require("dotenv").config();
const connectDB = require("./config/connectDB");

connectDB(process.env.DATABASE_URI);

const typeDefs = `#graphql
    type Query {
        myTaskList: [TaskList!]!
    }

    type Mutation {
        signUp(input: SignUpInput): AuthUser!
        signIn(input: SignInInput): AuthUser!
        createTaskList(title: String!): TaskList!
    }

    input SignInInput {
        email: String!
        password: String!
    }

    input SignUpInput {
        email: String!
        password: String!
        name: String!
        avatar: String
    }

    type AuthUser {
        user: User!
        accessToken: String!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String
    }

    type TaskList {
        id: ID!
        createdAt: String!
        title: String!
        progress: Float!
        users: [User!]!
    }

    type Todo {
        id: ID!
        content: String!
        isCompleted: Boolean!
        taskList: TaskList!
    }
`;

const resolvers = {
    Query: {
        myTaskList: () => {
            return [];
        }
    },
    Mutation: {
        signup: async (parent, { input }) => {
            const hashedPassword = await bcrypt.hash(input.password);
            const user = {
                ...input,
                password: hashedPassword
            }
        },
        signin: () => {

        },
        createTaskList: async (parent, { title }, { db, user }) => {
            if (!user) {
                throw new Error('Authentication Error');
            }
        }
    }
};