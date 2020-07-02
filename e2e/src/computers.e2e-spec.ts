import {browser, element, logging, by} from 'protractor';
import {ComputerPage} from "./computers.po";

describe('Test des ordinateurs', () => {
// Variable contenant notre PlanetPage
  let page: ComputerPage;
// variable que l’on utilisera pour compter le nombre de planètes
  let nbComputers: number;
// Avant de commencer les tests, nous demandons à notre navigateur de se rendre à l’URL suivante
  beforeEach(() => {
    page = new ComputerPage();
    browser.get('/computers');
  });

  it('En tant qu\'utilisateur, j\'accède à la page pour ajouter un nouvel ordinateur', () => {
    element.all(by.css('table.table tr')).then(tableLine => {
      nbComputers = tableLine.length;
      element(by.css('a.btn-primary')).click();
      expect(browser.driver.getCurrentUrl()).toContain('/computers/add');
      page.sleep(2000);
    });
  });

  it('En tant qu\'utilisateur, je crée un nouvel ordinateur via le formulaire et je vérifie qu\'il a bien été ajouté', () => {
    browser.get('/computers/add');
    page.fillForm();
    const submitButton = element.all(by.css('input[type="submit"]'));
    submitButton.click().then(() => {
      element.all(by.css('table.table tr')).then(newNbComputers => {
        nbComputers++;
        expect(newNbComputers.length).toEqual(nbComputers);
        page.sleep(2000);
      });
    });
  });

  it('En tant qu\'utilisateur, je modifie un ordinateur via le formulaire et je vérifie que la modification a été prise en compte', () => {
    element.all(by.css('td a.btn-warning')).last().click().then(() => {
      page.editForm();
      page.sleep(2000);
      const submitButton = element.all(by.css('input[type="submit"]'));
      submitButton.click().then(() => {
        expect(browser.driver.getCurrentUrl()).toContain('/computers');
        page.sleep(2000);
      });
    });
  });

  it('En tant qu\'utilisateur, je supprime un ordinateur', () => {
    element.all(by.css('td button.btn-danger')).last().click().then(() => {
      element.all(by.css('table.table tr')).then(newNbComputers => {
        nbComputers--;
        expect(newNbComputers.length).toEqual(nbComputers);
        page.sleep(2000);
      });
    });
  });

// Quand tout est fini, nous fermons le navigateur et nous affichons les logs dans la console
  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
