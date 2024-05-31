class Customer {
  constructor (
    public readonly name: string,
    public readonly age: number,
    public readonly money: number
  ) {}
}

class Queue {
  constructor (
    public readonly customers: Customer[],
  ) {}
}

const queue = new Queue([
  new Customer('Name', 18, 200),
  new Customer('', -1, -1)
])

for (const each of queue.customers) {
  OCL.verify(each)
}
