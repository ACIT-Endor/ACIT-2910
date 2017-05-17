module.exports = {

  'Demo test ' : function (browser) {
    browser
      .url('http://localhost:10000')
      .waitForElementVisible('body', 500)
      .click('div[id=login]')
      .setValue('input[id=email]', 'TestKitchen' )
      .setValue('input[id=pass]', 'test123')
      .click('button[id=loginBut]')
      .waitForElementVisible('body', 500)
      browser.expect.element('#OrderandCooked').to.be.visible;
      browser.end();
  }

};