module.exports = {
    '@tags': ['login', 'admin'],

  'Demo test ' : function (browser) {
    browser
      .url('http://localhost:10000')
      .pause(5000)
      .waitForElementVisible('body', 1000)
      .click('div[id=login]')
      .setValue('input[id=email]', 'TestAdmin' )
      .setValue('input[id=pass]', 'test123')
      .click('button[id=loginBut]')
      .waitForElementVisible('body', 500)
      browser.expect.element('#CRUD').to.be.visible;
      browser.end();
  }

};