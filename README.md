Automation script for DemoBlaze webprotal using,
  playwright, and java script

Available at SoftOne.spec.js file available under tests folder

1.Added a fixture to handle the user creation, so that created user can be use to the login 
2.Also helper file was used to manage all the product related functionalities
3.The product related functionalities, wrapped around  a test suite named (Search, add to cart and place order flows)
4. Once executed ( cmd -> npx playwright test), the test is running chromium, firefox, and webKit
5. To view the report cmd -> npx playwright show-report
6 .In order to view the browser behavior on softOne.spec.js cmd -> npx playwright test tests/softOne.spec.js –project=Chromium –headed

