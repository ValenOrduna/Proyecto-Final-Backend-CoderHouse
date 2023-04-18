class ManageDAOFirebase {
  constructor(collectionRef) {
    this.collection = collectionRef;
  }

  findAll = async () => {
    const data = await this.collection.get();
    const result = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return result;
  };

  find = async (id) => {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() };
  };

  findByAtributte = async (data, find) => {
    const doc = await this.collection.where(data, "==", find).limit(1).get();
    if (!doc.docs[0]) {
      return null;
    }
    return { id: doc.docs[0].id, ...doc.docs[0].data() };
  };

  create = async (data) => {
    const docRef = await this.collection.add(data);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  };

  update = async (id, data) => {
    const docRef = this.collection.doc(id);
    await docRef.update(data);
    const doc = await docRef.get();
    return { id: doc.id, ...doc.data() };
  };
}

export default ManageDAOFirebase;
