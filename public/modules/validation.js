class Validation {
  counter(newCount, leftInStock, lastCount) {
    if (/^\d+$/.test(newCount)) {
      newCount = Number(newCount);
      if (leftInStock && newCount > leftInStock) {
        newCount = leftInStock;
      } else if (newCount < 1) {
        newCount = 1;
      }
    } else {
      newCount = lastCount;
    }

    return newCount;
  }
}

export default new Validation();