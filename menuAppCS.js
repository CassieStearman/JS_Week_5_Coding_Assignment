/*
Author: Cassandria Stearman
Date: 2022/02/05

This is an app to create shopping lists
*/


// This is the shopping list item class
class Item {  
    constructor(description) {
        this.description = description;
    }
}

// This is the shopping list class
class List {    
    constructor(nameOfList) {
        this.nameOfList = nameOfList;
        this.items = [];
    }
    
    // This adds the item to a shopping list
    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error(`You can only add valid items. ${item} is not a valid item.`);
        }
    }

    //this will tell how many items are in a list
    describe() {
        return `There are ${this.items.length} items on the ${this.nameOfList} shopping list.`;
    }
}

// This is the main menu class
class Menu {  // menu class
    constructor () {
        this.lists = [];
        this.selectedList = null;
    }
   
    // This is the switch statement that makes the main menu work
    start() {
        let selection = this.showMainMenuOption();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createList();
                    break;
                case '2':
                    this.viewList();
                    break;
                case '3':
                    this.displayLists();
                    break;
                case '4':
                    this.deleteList();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOption();
        }
        alert("So long, farewell, auf wiedersehen, goodbye!") 
    }
    
    // These are the main menu options displayed to the user
    showMainMenuOption() {
        return prompt(`
        0) Exit
        1) Create a new shopping list
        2) View a shopping list
        3) Display all shopping lists
        4) Delete a shopping list
        `);
    }
    
    // This is the menu displayed to the user to add and delete items from a shopping list
    showListMenuOptions(listInfo) {
        return prompt(`
        0) Back
        1) Add an item
        2) Delete an item
        ~~~~~~~~~~~~~~~
        ${listInfo}
        `)
    }
    
    // This is the method to create a new list, option 1
    createList() {
        let nameOfList = prompt('What would you like to call this shopping list?');
        this.lists.push(new List(nameOfList));
    }
    
    // This is the method to view current shopping lists, option 2
    viewList() {
        let index = prompt('Enter the index of the shopping list you would like to view:');
        if (index > -1 && index < this.lists.length) {
            this.selectedList = this.lists[index];
            let description = this.selectedList.nameOfList + ' shopping list\n';

            for(let i = 0; i < this.selectedList.items.length; i++) {
                description += '           ' + i + ') ' + this.selectedList.items[i].description + '\n'; //I added more spaces here to make the display look better, it was offset and looked wierd
            }

            let selection = this.showListMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
                    break;
            }
        }
    }
    
    // This is the method to display shopping lists, option 3
    displayLists() {
        let listString = '';
        for (let i = 0; i < this.lists.length; i++) {
            listString += i + ') ' + this.lists[i].nameOfList + '\n';
        }
        alert(listString);
    }
    
    // This is the method to delete a shopping list, option 4
    deleteList() {
        let index = prompt('Enter the index of the shopping list you would like to delete:');
        if (index > -1 && index < this.lists.length) {
            this.lists.splice(index, 1);
        }
    }
   
    // This is the method to prompt the user to add an item to a shopping list, option 1 of the list menu options
    createItem() {
        let description = prompt('Enter the item you want to add to your shopping list:');
        this.selectedList.items.push(new Item(description));
    }
   
    // This is the method to delete an item from a shopping list, option 2 of the list menu options
    deleteItem() {
        let index = prompt('Enter the index of the item you want to delete from your shopping list:');
        if (index > -1 && index < this.selectedList.items.length) {
            this.selectedList.items.splice(index, 1);
        }
    }
}

//This creates an instance of my menu
let menu = new Menu();
menu.start();