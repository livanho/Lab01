import { describe, expect, it, jest } from "@jest/globals";

type ReceiptModule = typeof import("./fixed_receipt");

async function loadReceipt(): Promise<ReceiptModule> {
  let receipt!: ReceiptModule;

  await jest.isolateModulesAsync(async () => {
    receipt = await import("./fixed_receipt");
  });

  return receipt;
}

describe("receipt", () => {
  it("adds an item and includes it in the receipt total", async () => {
    const { addItem, total } = await loadReceipt();

    addItem("milk", 4.5);

    expect(total()).toBeCloseTo(51.99, 2);
  });

  it("does not change the list when deleting a missing item", async () => {
    const { deleteItem } = await loadReceipt();

    const itemsBefore = deleteItem("item that is not on the list");
    const itemsAfter = deleteItem("item that is not on the list");

    expect(itemsAfter).toEqual(itemsBefore);
  });

  it("handles an item with a zero price at the edge of valid input", async () => {
    const { addItem, total } = await loadReceipt();

    addItem("free sample", 0);

    expect(total()).toBeCloseTo(47.49, 2);
  });

  it("calculates tax from the subtotal and tax rate", async () => {
    const { tax } = await loadReceipt();

    expect(tax(0.06)).toBeCloseTo(2.8494, 4);
  });

  it("prints a receipt with the subtotal, tax, and total", async () => {
    const { printReceipt } = await loadReceipt();
    const log = jest.spyOn(console, "log").mockImplementation(() => undefined);

    printReceipt(0.06);

    expect(log).toHaveBeenCalled();
    expect(log.mock.calls).toEqual(
      expect.arrayContaining([
        ["Subtotal: $47.49"],
        ["Tax: $2.85"],
        ["Total: $50.34"],
      ]),
    );

    log.mockRestore();
  });
});
