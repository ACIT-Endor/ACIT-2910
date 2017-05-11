const home = require('../js/home');


test('Check number', () => {
  expect(home.numTest()).toBe(5);
});

test('Login button', () => {
  expect(home.login()).toBe("/loginPage");
});

