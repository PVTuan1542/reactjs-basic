/**
 * Express router paths go here.
 */

import { Immutable } from '@src/other/types';


const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Posts: {
    Base: '/posts',
    Get: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
    GetLoadMore: '/loadMore'
  },
  Comments: {
    Base: '/comments',
    Get: '/all',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/delete/:id',
    GetByPostId: '/postId/:id',
    GetByParentId: '/parentId/:id'

  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
