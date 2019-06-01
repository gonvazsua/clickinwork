import { CustomDatepipePipe } from './custom-datepipe.pipe';

describe('CustomDatepipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatepipePipe();
    expect(pipe).toBeTruthy();
  });
});
