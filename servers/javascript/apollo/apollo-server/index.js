const { ApolloServer, gql } = require("apollo-server");
const { v4 } = require("node-uuid");

// The GraphQL schema
const typeDefs = gql`
  type Query {
    todos(status: Status): [Todo]
  }

  type Mutation {
    createTodo(todo: TodoInput!): Todo
    updateTodo(id: String!, todo: TodoUpdateInput!): Todo
  }

  type Todo {
    createdAt: String!
    id: String!
    status: Status!
    text: String!
  }

  enum Status {
    ACTIVE
    COMPLETED
    ARCHIVED
  }

  input TodoInput {
    status: Status!
    text: String!
  }

  input TodoUpdateInput {
    status: Status
    text: String
  }
`;

let todos = [];

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    todos: (root, { status }) => {
      if (!status) {
        return todos;
      }

      return todos.filter(todo => todo.status === status).sort();
    }
  },
  Mutation: {
    createTodo: (root, { todo }) => {
      const newTodo = {
        id: v4(),
        createdAt: Date.now(),
        ...todo
      };

      todos.push(newTodo);

      return newTodo;
    },
    updateTodo: (root, { id, todo }) => {
      const index = todos.findIndex(todo => todo.id === id);
      const currentValue = todos[index];

      if (!currentValue) {
        throw new Error("Todo not found");
      }

      todos[index] = { ...currentValue, ...todo };

      return todos[index];
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(8081).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
