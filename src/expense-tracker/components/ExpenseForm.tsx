import categories from '../categories';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
interface Props{
    onSubmit:(data:ExpenseFormData)=> void;
}

const schema = z.object({
  description: z
    .string()
    .min(3, { message: 'Description should be at least 3 Characters' })
    .max(50),
  amount: z
    .number({ invalid_type_error: 'Amount is required.' })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({ message: 'Catergory is required.' }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

function ExpenseForm({onSubmit}:Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form onSubmit={handleSubmit((data)=>{
        onSubmit(data);
        reset();
    })}>
      <div className="mb-3">
        <label htmlFor="description" className="label-form">
          Description
        </label>
        <input
          {...register('description')}
          id="description"
          type="text"
          className="form-control"
        />
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </div>
      <div className="mb3">
        <label htmlFor="amount" className="label-form">
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="label-form">
          Category
        </label>
        <select {...register('category')} id="category" className="form-select">
            <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button disabled={!isValid} className="btn btn-primary">Submit</button>
    </form>
  );
}

export default ExpenseForm;
