import UserDAO from "../../src/persistence/DAOS/UserDAO.js";

const getUsers = async (ctx) => {
  const users = await UserDAO.findAll();
  if (!users) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar efectuar la sentencia",
    });
  }

  return (ctx.body = users);
};

const getUserById = async (ctx) => {
  const id = ctx.params.id;
  const user = await UserDAO.find(id);
  if (!user) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el usuario solicitado",
    });
  }

  return (ctx.body = user);
};

const createUser = async (ctx) => {
  const user = ctx.request.body;
  const newUser = await UserDAO.create(user);
  if (!newUser) {
    ctx.response.status = 400;
    return (ctx.body = {
      status: "error",
      message: "No se pudo crear el nuevo usuario",
    });
  }

  return (ctx.body = newUser);
};

const updateUser = async (ctx) => {
  const id = ctx.params.id;
  const user = ctx.request.body;
  const updatedUser = await UserDAO.update(id, user);
  if (!updatedUser) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el usuario a actualizar",
    });
  }

  return (ctx.body = updatedUser);
};

const deleteUser = async (ctx) => {
  const id = ctx.params.id;
  const deletedUser = await UserDAO.delete(id);
  if (!deletedUser) {
    ctx.response.status = 404;
    return (ctx.body = {
      status: "error",
      message: "No se pudo encontrar el usuario a eliminar",
    });
  }

  return (ctx.body = {
    status: "success",
    message: "El usuario se eliminó correctamente",
  });
};

export { getUsers, getUserById, createUser, updateUser, deleteUser };
