export default class Inventory
{
    static moveInventoryItem(inv_from, inv_to, index)
    {
        let items = inv_from.items;
        let inventory = inv_to.items;

        if(items[index].weight > 0 && inv_to.maxWeight && this.calcInventoryWeight(inv_to) === inv_to.maxWeight) return;

        inventory.push(items[index]);

        items.splice(index, 1);

        inv_from = {
            ...inv_from,
            items: items,
        };

        inv_to = {
            ...inv_to,
            items: inventory
        }
    }

    static calcInventoryWeight(inv)
    {
        let weight = 0;

        inv.items.forEach((item) => {
            weight += item.weight;
        });

        return weight;
    }
}