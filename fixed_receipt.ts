type Item = {
  name: string;
  price: number;
};

const ITEMS: Item[] = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

export function addItem(name: string, price: number): void {
  ITEMS.push({ name, price });
}

export function deleteItem(name: string): Item[] {
  const index = ITEMS.findIndex((item) => item.name === name);

  if (index >= 0) {
    ITEMS.splice(index, 1);
  }

  return ITEMS;
}

export function total(): number {
  return ITEMS.reduce((subtotal, item) => subtotal + item.price, 0);
}

export function tax(taxRate: number): number {
  return total() * taxRate;
}

export function printReceipt(taxRate: number): void {
  console.log("************************");

  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price.toFixed(2)}`);
  }

  const subtotal = total();
  const taxAmount = tax(taxRate);

  console.log("************************");
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Tax: $${taxAmount.toFixed(2)}`);
  console.log(`Total: $${(subtotal + taxAmount).toFixed(2)}`);
}