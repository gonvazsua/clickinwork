import { TestBed } from '@angular/core/testing';

import { DateFactoryService } from './date-factory.service';

fdescribe('DateFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateFactoryService = TestBed.get(DateFactoryService);
    expect(service).toBeTruthy();
  });

  it('Should return the diff in between two dates with hours', () => {
    const service: DateFactoryService = TestBed.get(DateFactoryService);

    const date1 = new Date("2019-06-02T12:00:00.000Z");
    const date2 = new Date("2019-06-02T08:00:00.000Z");
    expect(service.getDiffInHours(date1, date2).getHours()).toBe(4);

    const date3 = new Date("2019-06-02T18:00:00.000Z");
    const date4 = new Date("2019-06-02T08:00:00.000Z");
    expect(service.getDiffInHours(date3, date4).getHours()).toBe(10);

    const date5 = new Date("2019-06-02T18:10:00.000Z");
    const date6 = new Date("2019-06-02T08:00:00.000Z");
    expect(service.getDiffInHours(date5, date6).getHours()).toBe(10);
    expect(service.getDiffInHours(date5, date6).getMinutes()).toBe(10);

  });

  it('Should return the amount of mins as Date object', () => {
    const service: DateFactoryService = TestBed.get(DateFactoryService);
    const date = service.minutosADate(440);
    expect(date.getHours()).toBe(7);
    expect(date.getMinutes()).toBe(20);
  });

});
