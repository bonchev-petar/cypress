class HomePage {
  getNameBox() {
    return cy.get("form :nth-child(1) input");
  }
  getBindingBox() {
    return cy.get("h4 input");
  }
  getEmailBox() {
    return cy.get("form :nth-child(2) input");
  }
  getPasswordBox() {
    return cy.get("form :nth-child(3) input");
  }
  getGenderDropdown() {
    return cy.get("select");
  }
  getRadioEntrepreneur() {
    return cy.get("#inlineRadio3");
  }
  getShopTab() {
    return cy.get(":nth-child(2) > .nav-link");
  }
}

export default HomePage;
