import { createParamDecorator } from '@nestjs/common';
import { ListOptionsInterface } from '../interfaces/list-options/list-options.interface';

export const ListOptions = createParamDecorator(
  (data: Partial<ListOptionsInterface> = {}, req) => {
    //console.log('req:', req.args[0].query);
    let { categories, page, limit } = req.args[0].query;
    if (categories) {
      categories = categories.split(',');
    }
    if (page) {
      page = parseInt(page);
    } else {
      page = 1;
    }

    if (limit) {
      limit = parseInt(limit);
    } else if (limit === undefined && data.limit) {
      limit = data.limit;
    } else {
      limit = 2;
    }

    return { categories, page, limit };
  });