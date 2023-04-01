import CarouselState from '../../src/models/CarouselState';

function makeSut(positions: number[] = [200, 400, 600]) {
  const sut = new CarouselState(positions);

  return { sut };
}

describe('CarouselState', () => {
  describe('currentIndex', () => {
    it('Should be start as zero', () => {
      const { sut } = makeSut();

      expect(sut.currentIndex).toBe(0);
    });

    it('Should update if a valid value is assigned', () => {
      const { sut } = makeSut([100, 200, 300]);

      expect(sut.currentIndex).toBe(0);

      sut.currentIndex = 1;
      expect(sut.currentIndex).toBe(1);

      sut.currentIndex = 2;
      expect(sut.currentIndex).toBe(2);
    });

    it('Should not update if a invalid value is assigned (bigger than positions length or less than zero)', () => {
      const { sut } = makeSut([100, 200, 300]);

      expect(sut.currentIndex).toBe(0);

      sut.currentIndex = 4;
      expect(sut.currentIndex).toBe(0);

      sut.currentIndex = -1;
      expect(sut.currentIndex).toBe(0);
    });

    it('Should Update currentIndex limit if positions length change', () => {
      const { sut } = makeSut([100, 200, 300]);

      sut.currentIndex = 2;
      expect(sut.currentIndex).toBe(2);

      sut.currentIndex = 3;
      expect(sut.currentIndex).toBe(2);

      sut.positions = [100, 200, 300, 400];

      sut.currentIndex = 3;
      expect(sut.currentIndex).toBe(3);

      sut.currentIndex = 4;
      expect(sut.currentIndex).toBe(3);
    });
  });

  describe('positions', () => {
    it('Should initialize with the correct value', () => {
      const positions = [100, 200, 300];

      const { sut } = makeSut([...positions]);

      expect(sut.positions).toEqual(positions);
    });

    it('Should allow assign a new positions', () => {
      const positions = [100, 200, 300];

      const { sut } = makeSut([...positions]);

      expect(sut.positions).toEqual(positions);

      const newPositions = [300, 600, 900];
      sut.positions = [...newPositions];

      expect(sut.positions).toEqual(newPositions);
    });
  });
});
