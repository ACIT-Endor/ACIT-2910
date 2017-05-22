module.exports = {
    '@tags': ['login', 'kathy'],
    
  'Demo test ' : function (browser) {
    browser
      .url('http://localhost:10000')
      .pause(5000)
      .waitForElementVisible('body', 1000)
      .click('div[id=login]')
      .setValue('input[id=email]', 'Kathy@email.com' )
      .setValue('input[id=pass]', 'pass321')
      .click('button[id=loginBut]')
      .waitForElementVisible('body', 1500)
      .click('button[id=passChange]')
      .setValue('input[id=newPass]', 'pass123')
      .setValue('input[id=confirmPass]', 'pass123')
      .click('button[id=confirmBut]')
      .pause(1000)
      .acceptAlert()
      .click('div[id=logout]')
      .setValue('input[id=email]', 'Kathy@email.com' )
      .setValue('input[id=pass]', 'pass123')
      .pause(3000)
      .click('button[id=loginBut]')
      .pause(3000)
      .waitForElementVisible('body', 1500)
      browser.expect.element('#profileWelcome').to.be.visible;
      browser.end();
  }

};