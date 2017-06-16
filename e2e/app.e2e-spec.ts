import { TulipPage } from './app.po';

describe('tulip App', () => {
  let page: TulipPage;

  beforeEach(() => {
    page = new TulipPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
