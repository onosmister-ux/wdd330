import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    this.renderProductDetails();

    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];

    cartItems.push(this.product);

    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  document.getElementById("productBrand").textContent =
    product.Brand.Name;

  document.getElementById("productName").textContent =
    product.NameWithoutBrand;

  const img = document.getElementById("productImage");

  img.src = product.Image;
  img.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent =
    `$${product.FinalPrice}`;

  document.getElementById("productColor").textContent =
    product.Colors[0].ColorName;

  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id =
    product.Id;
}