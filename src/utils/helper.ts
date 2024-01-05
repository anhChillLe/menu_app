export {}

declare global {
  interface Number {
    toComasString: () => string
  }
}

Number.prototype.toComasString = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
