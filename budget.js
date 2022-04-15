//SELECT ELEMENTS
console.log('Hello welcome to our Budget App');

//we selected balce total-income and total-expense from the container.
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const expenseTotalEl = document.querySelector(".outcome-total");

const expenseEl = document.querySelector("#expense");
const incomeEl = document.querySelector("#income");
const allEl = document.querySelector("#all");

//now grab all the lists
const expenseList = document.querySelector("#expense #list");
// console.log(expenseList);
const incomeList = document.querySelector("#income #list");
const allList = document.querySelector("#all #list");

//SELECT BUTTONS
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");



//INPUT ITEMS
const addExpense=document.querySelector(".add-expense");
const expenseTitle=document.querySelector("#expense-title-input");
const expenseAmount=document.querySelector("#expense-amount-input");

const addIncome=document.querySelector(".add-income");
const incomeTitle=document.querySelector("#income-title-input");
const incomeAmount=document.querySelector("#income-amount-input");

//VARIABLE

// let ENTRY_LIST=[];
let ENTRY_LIST;
let blance=0, income=0, expense=0;


//WE WILL CHECK IF ENTRY_LIST IS ALREADY PRESENT IN LOCAL SORAGE OR NOT, AND THEN UPDATEUI
ENTRY_LIST= JSON.parse(localStorage.getItem("entry_list")) || [];

updateUI();

const DELETE='delete', EDIT='edit';
//EVENT LISTENERS


//show function control which page is showing
//hide() hides the page
//active(): make the toggle button more visible
//inactive(): make the toggle button less visible
expenseBtn.addEventListener("click", ()=>{
    show(expenseEl);
    hide([incomeEl,allEl]);
    active(expenseBtn)
    inactive([incomeBtn,allBtn]);
});

incomeBtn.addEventListener("click", ()=>{
    show(incomeEl);
    hide([expenseEl,allEl]);
    active(incomeBtn)
    inactive([expenseBtn,allBtn]);
});

allBtn.addEventListener("click", ()=>{
    show(allEl);
    hide([incomeEl,expenseEl]);
    active(allBtn)
    inactive([incomeBtn,expenseBtn]);
});

addExpense.addEventListener("click", ()=>{
    //IF ONE OF THE ENTRY IS EMPTY PLS EXIT
    if(!expenseAmount.value || !expenseTitle.value) return;
    
    //WHEN BOTH THE ENTRIES ARE PRESENT AND NOT NULL
    let expense={
        type:'expense',
        title: expenseTitle.value,
        amount: parseFloat(expenseAmount.value)
    };
    ENTRY_LIST.push(expense);
    updateUI();
    clearInputs([expenseAmount,expenseTitle])
});

addIncome.addEventListener("click", ()=>{
    //IF ONE OF THE ENTRY IS EMPTY PLS EXIT
    if(!incomeAmount.value || !incomeTitle.value) return;
    
    //WHEN BOTH THE ENTRIES ARE PRESENT AND NOT NULL
    let income={
        type:'income',
        title: incomeTitle.value,
        amount: parseFloat(incomeAmount.value)   
    };
    ENTRY_LIST.push(income);
    updateUI();
    clearInputs([incomeAmount,incomeTitle])
});

incomeList.addEventListener("click", deleteORedit);
expenseList.addEventListener("click", deleteORedit);
allList.addEventListener("click", deleteORedit);

//HELPERS
//deleteORedit will take clicked event as parameter.
function deleteORedit(event) {
    console.log("list was clicked!", event.target, event.target.parentNode);
    const targetBtn=event.target.parentNode;

    const entry=targetBtn.parentNode;       //clicked li
    if(targetBtn.id==DELETE)
    {
        deleteEntry(entry);
    }
    else if(targetBtn.id=EDIT)
    {
        editEntry(entry);   
    }
}

function deleteEntry(entry) {
    ENTRY_LIST.splice(entry.id, 1);         //which index to delete and how many elements to be delete from that.
    updateUI();
}

function editEntry(entry) {
    let ENTRY=ENTRY_LIST[entry.id];
    // console.log(ENTRY);
    if(ENTRY.type=="income")
    {
        incomeAmount.value=ENTRY.amount;
        incomeTitle.value=ENTRY.title;
    }
    else if(ENTRY.type=="expense")
    {
        expenseAmount.value=ENTRY.amount;
        expenseTitle.value=ENTRY.title;
    }

    deleteEntry(entry);
}

function show(element) {
    element.classList.remove("hide");
}

function hide(elements) {
    elements.forEach(element => {
        element.classList.add("hide");
    });
}

function active(element) {
    element.classList.add("active");
}

function inactive(elements) {
    elements.forEach(element => {
        element.classList.remove("active");
    })
}

function clearInputs(inputs) {
    inputs.forEach( input=>{
        input.value="";
    })
}

function updateUI() {
    let incomeTotal=calculateTotal('income', ENTRY_LIST);
    let expenseTotal=calculateTotal('expense', ENTRY_LIST);
    let balanceTotal=parseFloat(incomeTotal)-parseFloat(expenseTotal);
    // console.log(balanceTotal);
    balanceTotal=Math.abs(balanceTotal);
    let sign =(incomeTotal>=expenseTotal)?"":"-";

    balanceEl.innerHTML=`<small>${sign}Rs</small>${balanceTotal}`;
    incomeTotalEl.innerHTML=`<small>Rs</small>${incomeTotal}`;
    expenseTotalEl.innerHTML=`<small>Rs</small>${expenseTotal}`;

    //updating UI
    clearElements([expenseList, incomeList, allList]);       //clearinf all the list, argument array of lists

    //DETERMINE SIGN OF THE BALANCE

    //Filling the Lists
    ENTRY_LIST.forEach((entry, index)=>{
        if(entry.type=="expense")
        {
            showEntry(expenseList, entry.type, entry.title, entry.amount, index, false );
        }
        else if(entry.type=="income")
        {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index );
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index );
    });

    updateChart(incomeTotal, expenseTotal);

    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));
}

function calculateTotal(type, list) {
    let sum=0;
    list.forEach(entry=>{
        if(entry.type==type)
        {
            sum+=entry.amount;
        }
    })
    return sum;
}

function clearElements(elements) {
    elements.forEach(element=>{
        element.innerHTML="";
    })
    
}

function showEntry(list, type, title, amount, id ) {
    let entry=`<li id=${id} class=${type}>
                <div class="entry">    
                   <span class="sub-title"> ${title} :</span><span class="sub-amount"><small>Rs.</small>${amount}</span>
                </div>
                <div id="edit"><img class="icon" src="icon/edit.png" alt="" srcset=""></div>   
                <div id="delete"><img class="icon" src="icon/trash.png" alt="" srcset=""></div>   
            </li>`;
    const position="afterbegin";
    list.insertAdjacentHTML(position, entry);
}


