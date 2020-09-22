// this is used to update the name and toggle the isComplete value
export default function updateList(listItems, id, name, complete) {
    const itemIndex = listItems.findIndex(function (item) {
        if (item.id === parseInt(id)) {
            return true;
        }
    });

    // update name value
    if (name !== null) {
        listItems[itemIndex].name = name;
    }

    // update isComplete value
    if (complete === true || complete === false) {
        listItems[itemIndex].isComplete = complete;
    }

    return listItems;
}
