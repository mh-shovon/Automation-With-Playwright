Feature: Ecommerce validations

  Scenario: Placing the order
    Given a login to ecommerce application with valid user credentials- "mhshovon1@gmail.com" and "Mhshovon1"
    When Add "ADIDAS ORIGINAL" to the cart
    Then verify "ADIDAS ORIGINAL" is displayed in the cart
    When Enter valid details and place the order
    Then Verify the order is presented in the order history page