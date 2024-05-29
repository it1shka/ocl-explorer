class Person {
  constructor (
    public readonly name: string,
    public readonly surname: string,
    public readonly age: number,
  ) {}
}

class Family {
  constructor (
    public readonly members: Person[],
  ) {}
}

const family = new Family([
  new Person('John', 'Doe', 19),
  new Person('Alex', 'Gordon', 8),
  new Person('Stacey', 'Brown', 40),
  new Person('Jack', 'Abrams', 42),
])

oclVerify(family)
