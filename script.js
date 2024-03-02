function updateItemsLeftCount(items) {
    const activeItemsCount = items.filter(item => item.status === "active").length;
    const itemsLeftElement = document.querySelector(".items-left");
    itemsLeftElement.innerText = `${activeItemsCount} item${activeItemsCount !== 1 ? 's' : ''} left`;
}

function getItems(){
    db.collection("todo-items").onSnapshot((snapshot) => {
        let items = [];
        snapshot.docs.forEach((doc) => {
            items.push({
                id: doc.id, 
                ...doc.data()
            })
        })
        generateItems(items);
        updateItemsLeftCount(items);
    })
}

function generateItems(items){
    let todoItems = []
    items.forEach((item) => {
        let todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        let checkContainer = document.createElement("div");
        checkContainer.classList.add("check");
        let checkMark = document.createElement("div");
        checkMark.classList.add("check-mark");
        checkMark.innerHTML = '<img src="assets/icon-check.svg">';
        checkMark.addEventListener("click", function(){
            markCompleted(item.id);
        })
        checkContainer.appendChild(checkMark);

        let todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.innerText = item.text;

        if(item.status == "completed"){
            checkMark.classList.add("checked");
            todoText.classList.add("checked");
        }
        todoItem.appendChild(checkContainer);
        todoItem.appendChild(todoText);
        todoItems.push(todoItem)
    })
    document.querySelector(".todo-items").replaceChildren(...todoItems);
}



function addItem(event){
    event.preventDefault();
    let text = document.getElementById("todo-input");
    let newItem = db.collection("todo-items").add({
        text: text.value,
        status: "active"
    })
    text.value = "";
}

function markCompleted(id){
    let item = db.collection("todo-items").doc(id);
    item.get().then(function(doc) {
        if (doc.exists) {
            if(doc.data().status == "active"){
                item.update({
                    status: "completed"
                })
            } else {
                item.update({
                    status: "active"
                })
            }
        }
    })
}

// Function to clear completed todo items
// Function to clear completed todo items from the database
function clearCompletedItems() {
    db.collection("todo-items").get().then((snapshot) => {
        snapshot.forEach((doc) => {
            const item = doc.data();
            if (item.status === "completed") {
                db.collection("todo-items").doc(doc.id).delete().then(() => {
                    console.log("Completed item deleted successfully!");
                }).catch((error) => {
                    console.error("Error deleting completed item: ", error);
                });
            }
        });
    }).catch((error) => {
        console.error("Error getting todo items: ", error);
    });
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
}

getItems();