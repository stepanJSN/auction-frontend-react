import { delay } from './delay';

jest.useFakeTimers();

describe('delay', () => {
  it('should resolve after the specified time', async () => {
    const timeDelay = 1000;
    const mockCallback = jest.fn();

    const promise = delay(timeDelay).then(() => mockCallback());

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeDelay);

    await promise;

    expect(mockCallback).toHaveBeenCalled();
  });
});
