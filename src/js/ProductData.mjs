function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }

  async getData() {
    const response = await fetch(this.path);
    return await response.json();
  }

  async findProductById(id) {
    const data = await this.getData();

    return data.find(product => product.Id === id);
  }
}