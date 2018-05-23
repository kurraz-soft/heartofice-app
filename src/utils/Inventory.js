export default class Inventory
{
    static moveInventoryItem(inv_from, inv_to, index)
    {
        let items = inv_from.items;
        let inventory = inv_to.items;

        if(items[index].weight > 0 && inv_to.maxWeight && this.calcInventoryWeight(inv_to) === inv_to.maxWeight) return;

        let inv_index = -1;

        //change count & unset item
        inventory.forEach((inv_item, i) => {
            if(inv_item.name === items[index].name)
            {
                inv_index = i;
            }
        });

        if(inv_index === -1)
        {
            inventory.push({
                ...items[index],
                count: 1,
            });
        }else
        {
            inventory[inv_index].count++;
        }

        items[index].count--;
        if(items[index].count === 0)
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
            weight += item.weight * item.count;
        });

        return weight;
    }
}