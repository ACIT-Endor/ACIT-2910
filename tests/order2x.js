module.exports = {
    '@tags': ['login', 'paul'],
  'Demo test ' : function (browser) {
    browser
      .url('http://localhost:10000')
      .pause(5000)
      .waitForElementVisible('body', 1000)
      .click('div[id=login]')
      .setValue('input[id=email]', 'Paul@email.com' )
      .setValue('input[id=pass]', 'pass123')
      .click('button[id=loginBut]')
      .waitForElementVisible('body', 1500)
      .click('div[id=homeLogo]')
      .pause(5000)
      .waitForElementVisible('body', 500)
      .click('div[id=menuScroller]')
      .pause(1000)
      .waitForElementVisible('body', 500)
      .click('div[id=mainFood]')
      .pause(1000)
      .click('div[title="Wookie Steak"]')
      .pause(1000)
      .click('div[id=descDiv]')
      .pause(1000)
      .acceptAlert()      
      .pause(1000)
      .click('div[title="Tauntaun Burger"]')
      .pause(1000)
      .click('div[id=descDiv]')
      .pause(1000)
      .acceptAlert()
      .pause(1000)
      .click('div[title="Bantha Platter"]')
      .pause(1000)
      .click('div[id=descDiv]')
      .pause(1000)
      .acceptAlert()
      .click('div[id=cart]')
      .waitForElementVisible('body', 500)
      browser.expect.element('#orderBox').to.be.visible;
      browser.end();
  }

};