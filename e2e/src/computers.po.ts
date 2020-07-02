import {browser, by, element} from 'protractor';

export class ComputerPage {

  sleep(time: number) {
    browser.driver.sleep(time);
  }

  fillForm() {
    const modele = element.all(by.id('modele'));
    const marque = element.all(by.id('Dell'));
    const type = element.all(by.css('#type option[value="Portable"]'));
    const category = element.all(by.id('Gaming'));
    const prixAchat = element.all(by.id('prixAchat'));

    modele.sendKeys(Math.random().toString(36).substr(2, 8));
    marque.click();
    type.click();
    category.click();
    prixAchat.sendKeys(Math.round(100 + Math.random() * 1900));
  }
}
