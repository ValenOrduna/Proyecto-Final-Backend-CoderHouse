class ManageDAOMongo {
  constructor(collection) {
    this.collection = collection;
  }

  findAll = async () => {
    const result = await this.collection.find();
    return result;
  };

  find = async (find) => {
    const result = await this.collection.findById(find);
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  };

  findByAtributte = async (data, find) => {
    const result = await this.collection.findOne({ [data]: find });
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  };

  create = async (data) => {
    const result = await this.collection.create(data);
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  };

  update = async (find, data) => {
    const result = await this.collection.updateOne(find, data);
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  };
}

export default ManageDAOMongo;
