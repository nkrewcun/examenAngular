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
      page.sleep(1000);
    });
  });

  it('En tant qu\'utilisateur, je crée un nouvel ordinateur via le formulaire et je vérifie qu\'il a bien été ajouté', () => {
    browser.get('/computers/add');
    page.fillForm();
    page.sleep(2000);
    const submitButton = element.all(by.css('input[type="submit"]'));
    submitButton.click().then(() => {
      element.all(by.css('table.table tr')).then(newNbPlanets => {
        nbComputers++;
        expect(newNbPlanets.length).toEqual(nbComputers);
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
