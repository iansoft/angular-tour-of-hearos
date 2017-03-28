import { AngularTourOfHearosPage } from './app.po';

describe('angular-tour-of-hearos App', () => {
  let page: AngularTourOfHearosPage;

  beforeEach(() => {
    page = new AngularTourOfHearosPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
