import * as api from './api';

export default [
  {
    method: 'POST',
    path: '/echo',
    config: {
      handler: api.echo,
      auth: false,
    },
  },
];