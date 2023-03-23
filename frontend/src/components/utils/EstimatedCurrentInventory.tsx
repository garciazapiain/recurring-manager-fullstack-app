function estimatedCurrentInventory(original_inventory, inventory_updated_date, use_days, standard_size) {
    //refactor date formattted
    const unitsPerDay = (standard_size / use_days)
    const dateNow = new Date();
    const dateSplit = inventory_updated_date.split("")
    const dateYear = dateSplit.slice(0, 4).join("")
    const dateDay = dateSplit.slice(8, 10).join("")
    const dateMonth = dateSplit.slice(5, 7).join("")
    const dateFormatted = new Date(`${dateMonth}/${dateDay}/${dateYear}`)
    // @ts-ignore
    const diffTime = Math.abs(dateFormatted - dateNow);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const adjustedInventory = original_inventory - (diffDays * unitsPerDay)
    return adjustedInventory > 0 ? adjustedInventory : 0;
}

export default estimatedCurrentInventory