import { useState } from 'react';
import ExpenseList from './expense-tracker/components/ExpenseList';
import ExpenseFilter from './expense-tracker/components/ExpenseFilter';
import ExpenseForm from './expense-tracker/components/ExpenseForm';


function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'ewfwe',
      amount: 10,
      category: 'Utilities',
    },
    {
      id: 2,
      description: 'ewfwe',
      amount: 10,
      category: 'Entertainment',
    },
    {
      id: 3,
      description: 'ewfwe',
      amount: 10,
      category: 'Groceries',
    },
    {
      id: 4,
      description: 'ewfwe',
      amount: 10,
      category: 'Utilities',
    },
  ]);

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const visibleExpenses = selectedCategory
    ? expenses.filter((e) => e.category === selectedCategory)
    : expenses;

  return (
    <div>
      <div className="mb-5">
        <ExpenseForm
          onSubmit={(newExpense) =>
            setExpenses([
              ...expenses,
              { ...newExpense, id: expenses.length + 1 },
            ])
          }
        />
      </div>
      <div className="mb-3">
        <ExpenseFilter
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </div>

      <ExpenseList expenses={visibleExpenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
