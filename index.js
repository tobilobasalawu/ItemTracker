import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL: "https://realtime-database-b98d8-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");
let inputValue = document.querySelector('.cart-input');
let innerList = document.querySelector('.inner-html');

onValue(shoppingListInDB, (snapshot) => {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    console.log(snapshot.val());
  
    clearShoppingList()
      for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i];
        let currentItemId = currentItem[0]
        let currentItemValue = currentItem[1];
  
      addingToDB(currentItem);
    }
  } else {_
    innerList.innerHTML = 'No items here...'
  }
})

let clearShoppingList = () => document.querySelector('.inner-html').innerHTML = '';

document.querySelector('.cart-button')
  .addEventListener('click', () => {
    let value = inputValue.value;
    push(shoppingListInDB, value);

    /*addingToDB(value);*/
    clearInputValue();
    
  })
  let Value = document.querySelector('.cart-input').value;
  const addingToDB = (item) => {
    //document.querySelector('.inner-html').innerHTML += `<li>${Value}</li>`

    let itemID = item[0];
    let itemValue = item[1];

    let newItemList = document.createElement("li")
    newItemList.textContent = itemValue;
    innerList.append(newItemList);

    newItemList.addEventListener('click', () => {
      let exactLocationInDB = ref(database, `shoppingList/${itemID}`)

      remove(exactLocationInDB);
    })
  };

 

  const clearInputValue = () => document.querySelector('.cart-input').value = '';
