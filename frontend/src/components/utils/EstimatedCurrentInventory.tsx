function estimatedCurrentInventory(original_inventory, inventory_updated_date, use_days, standard_size) {
    const unitsPerDay = (standard_size / use_days)
    const dateNow = new Date();
    const dateFormatted = new Date(inventory_updated_date)
    // @ts-ignore
    const diffTime = Math.abs(dateNow.getTime() - dateFormatted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const twoDayBuffer = 2*(standard_size/use_days)
    const adjustedInventory = original_inventory - (diffDays * unitsPerDay) + twoDayBuffer
    return adjustedInventory > 0 ? adjustedInventory : 0;
}

export default estimatedCurrentInventory