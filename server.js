const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require('./src/generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.videos()
    }
  },
  Mutation: {
    postVideo: (root, args, context) => {
      return context.prisma.createVideo({
        url: args.url,
        thumbnail: args.thumbnail,
        title: args.title,
        description: args.description,
      })
    },
    postComment: (root, args, context) => {
      return context.prisma.createComment({
        text: args.text,
        video: args.video
      })
    }
  },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));