import { NgFullCalendarPage } from './app.po';

describe('ng-full-calendar App', function() {
  let page: NgFullCalendarPage;

  beforeEach(() => {
    page = new NgFullCalendarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
