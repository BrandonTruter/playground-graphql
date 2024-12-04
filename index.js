const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type LearningDay {
    id: ID!
    date: String!
    mountain: String!
  }

  type Query {
    totalDays: Int!
    allLearningDays: [LearningDay!]!
  }
`;

const server = new ApolloServer({ typeDefs, mocks: true });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
