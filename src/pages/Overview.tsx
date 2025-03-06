import { Link } from 'react-router-dom';
import { routes } from '../config/consts';

const Overview = () => (
  <div className="p-6">
    Welcome on Finpal ! Please click on transactions to check your
    <Link
      className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline"
      to={routes.transactions}
    >
      {' '}
      transactions
    </Link>
    .
  </div>
);

export default Overview;
