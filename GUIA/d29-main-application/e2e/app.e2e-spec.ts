import { D29MainApplicationPage } from './app.po';

describe('d29-main-application App', function() {
  let page: D29MainApplicationPage;

  beforeEach(() => {
    page = new D29MainApplicationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
