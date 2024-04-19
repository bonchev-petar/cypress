Feature: End to end ecommerce validation

    application regression
    @Regression
    Scenario: Ecommerce product delivery
        Given I open ecommerce page
        When I add items to cart
        And Validate the total prices
        Then Select the country submit and verify thankyou

    @Smoke
    Scenario: Filling the form to shop
        Given I open ecommerce page
        When I fill the form details
            | name    | gender |
            | Roberta | Female |
        Then Validate the form behavior
        And Select the shop page