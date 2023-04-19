import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
} from "graphql";
import UserDAO from "../src/persistence/DAOS/UserDAO.js";
import ProductDAO from "../src/persistence/DAOS/ProductDAO.js";

const UsuarioType = new GraphQLObjectType({
  name: "User",
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLFloat },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    avatar: { type: GraphQLString },
    password: { type: GraphQLString },
    idCart: { type: GraphQLString },
  },
});

const UserInputType = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLFloat },
    address: { type: GraphQLString },
    phone: { type: GraphQLString },
    avatar: { type: GraphQLString },
    password: { type: GraphQLString },
    idCart: { type: GraphQLString },
  },
});

const UserMutation = new GraphQLObjectType({
  name: "UserMutation",
  fields: {
    createUser: {
      type: UsuarioType,
      args: {
        input: { type: UserInputType },
      },
      async resolve(parent, { input }) {
        const newUser = await UserDAO.create(input);
        return newUser;
      },
    },
    deleteUser: {
      type: UsuarioType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, { id }) {
        const deletedUser = await UserDAO.delete(id);
        return deletedUser;
      },
    },
  },
});

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: {
    image: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    stock: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
  },
});

const ProductInputType = new GraphQLInputObjectType({
  name: "ProductInput",
  fields: {
    image: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    stock: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
  },
});

const ProductMutation = new GraphQLObjectType({
  name: "ProductMutation",
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        input: { type: ProductInputType },
      },
      async resolve(parent, { input }) {
        const newProduct = await ProductDAO.create(input);
        return newProduct;
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, { id }) {
        const deletedProduct = await ProductDAO.delete(id);
        return deletedProduct;
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UsuarioType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const user = await UserDAO.find(args.id);
        return user;
      },
    },
    users: {
      type: new GraphQLList(UsuarioType),
      async resolve() {
        const allUsers = await UserDAO.findAll();
        return allUsers;
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const product = await ProductDAO.find(args.id);
        return product;
      },
    },
    products: {
      type: new GraphQLList(ProductType),
      async resolve() {
        const allProducts = await ProductDAO.findAll();
        return allProducts;
      },
    },
  },
});

const MutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    createUser: {
      type: UsuarioType,
      args: {
        input: { type: UserInputType },
      },
      async resolve(parent, { input }) {
        const newUser = await UserDAO.create(input);
        return newUser;
      },
    },
    updateUser: {
      type: UsuarioType,
      args: {
        id: { type: GraphQLString },
        input: { type: UserInputType },
      },
      async resolve(parent, { id, input }) {
        const updatedUser = await UserDAO.update(id, input);
        return updatedUser;
      },
    },
    deleteUser: {
      type: UsuarioType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, { id }) {
        const deletedUser = await UserDAO.delete(id);
        return deletedUser;
      },
    },
    createProduct: {
      type: ProductType,
      args: {
        input: { type: ProductInputType },
      },
      async resolve(parent, { input }) {
        const newProduct = await ProductDAO.create(input);
        return newProduct;
      },
    },
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
        input: { type: ProductInputType },
      },
      async resolve(parent, { id, input }) {
        const updatedProduct = await ProductDAO.update(id, input);
        return updatedProduct;
      },
    },
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parent, { id }) {
        const deletedProduct = await ProductDAO.delete(id);
        return deletedProduct;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationType,
});

export default schema;
