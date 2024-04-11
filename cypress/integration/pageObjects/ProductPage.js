class ProductsPage {
  getCheckoutBtn() {
    return cy.get("#navbarResponsive a");
  }
}

export default ProductsPage;
