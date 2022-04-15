

We are creating a Budget App, only using JS i.e. Vanilla JS. No framework.
We will show here three details: Balance, Income and Outcome.
And Balance, Total Income and Total expense along with a bun-chart display.

It contains a Dashboard containg three buttons: Income, Expenses and All. These buttons are use yo toggle between the lists.

all: shows list for all incomes and expenses entries in the list.
income: shows recent income entries and new input registering space.
expenses: same as income just show entries of expenses and a blobk for adding new expense.

Each space for adding a new entry contains three elements, 1.Title, 2.Amount(in Numbers) and 3. plus sign button to add.
Each block display in Income or Expense page containes -->|Title:Amount         (edit button)(trash button)|     

On entering an expense and add it to the list, we can see the entered data in total expense, total expense, 
entry in expense list and a circle or bun shaped display showing the ratio of income and expense (total both) as a bun chart.
Similarly, happens when we add income. we can see balamce as =total income - total expense.
And in 'All' button page we can all the entries there.
Both expenses and Incomes are to be shown in different colors.
the priority of showing entries is of 'most recent' entry.

Every Entry contains a trash button, clicking on which we can delete that entry completely which will be reflected in the 
Bun Chart, Balance, total Income and Total Expense.

On clicking 'Edit button' in Income or Expense page, it will remove it's contribution from the main displaying data,
and show the Entered value in the adding space down below, which will be added again once clicked on plus sign button with or wihtout editing.

Lastly, onloading the page, we still have out data intact, as we will be storing these data in local Storage.