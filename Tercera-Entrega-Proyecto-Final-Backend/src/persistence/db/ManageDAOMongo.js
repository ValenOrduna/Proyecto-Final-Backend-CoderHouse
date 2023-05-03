class ManageDAOMongo {
  constructor(collection) {
    this.collection = collection;
  }

  findAll = async () => {
    let result = await this.collection.find().lean();
    let resultClean = result.map((data) => {
      data.id = data._id.toString();
      delete data._id;
      return data;
    });
    return resultClean;
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

  update = async (id, data) => {
    const result = await this.collection.updateOne({ _id: id }, data);
    if (result) {
      result.id = result._id;
      delete result._id;
    }
    return result;
  };

  delete = async (id) => {
    const deleteData = await this.collection.deleteOne({ _id: id });
    return deleteData;
  };
}

export default ManageDAOMongo;
