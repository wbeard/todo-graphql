Server spec:

1. Runs on port 8081
2. Implements the following schema

```graphql
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
```

3. Hosts an instance of GraphiQL or GraphQL Playground to explore graph
4. Is stateful for as long as the server lives
