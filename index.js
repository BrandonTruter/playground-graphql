const { Query } = require("mongoose");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  """
  A learning day based on the relevant topics
  """
  type LearningDay {
    "A learning days' unique identifier"
    id: ID!
    "The date of the learning day"
    date: Date!
    "The site for the Topics"
    site: String!
    "The topics covered on the learning day"
    topics: Topics
  }

  enum Topics {
    GRAPHQL
    RAILS
    VUE
  }

  type Query {
    totalDays: Int!
    allDays: [LearningDay!]!
  }

  input AddDayInput {
    date: Date!
    site: String!
    topics: Topics!
  }

  type RemoveDayPayload {
    day: LearningDay!
    removed: Boolean!
    totalBefore: Int
    totalAfter: Int
  }

  type Mutation {
    addDay(input: AddDayInput!): LearningDay!
    removeDay(id: ID!): RemoveDayPayload!
  }

  type Subscription {
    newDay: LearningDay!
  }
`;

const mocks = {
  Date: () => "10/2/2025",
  String: () => "Viva Learning",
  Query: () => ({
    allDays: () => new Array(5).fill(),
  }),
};

const server = new ApolloServer({ typeDefs, mocks });

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
