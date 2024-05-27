import { OclEngine } from "@stekoe/ocl.js"

class Person {
  constructor (
    public readonly name: string,
    public readonly surname: string,
    public readonly age: number,
  ) {}
}

class Family {
  typeName = "Family"
  constructor (
    public readonly members: Person[],
  ) {}
}

const family = new Family([
  new Person("Tikhon", "Belousov", 19),
  new Person("Fyodor", "Belousov", 12),
  new Person("Glafira", "Belousova", 8),
  new Person("", "", -1),
])

const engine = OclEngine.create()
engine.addOclExpression(`
  context Family inv NamesAreCorrect:
    not self.members->any(p | p.name = "")

  context Family inv SurnamesAreCorrect:
    not self.members->any(p | p.surname = "")

  context Family inv AgesAreCorrect:
    not self.members->any(p | p.age < 0 or p.age > 200)
`)
const result = engine.evaluate(family)
console.dir(result)
