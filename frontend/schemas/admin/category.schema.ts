import { object, string } from 'yup';
import { errorLabels } from '@/constants/errorLabels';

const { admin: adminErrorLabels } = errorLabels;
const { category: categoryErrorLabels } = adminErrorLabels;

export const categorySchema = object().shape({
  name: string()
    .required(categoryErrorLabels.name.required)
    .max(255, categoryErrorLabels.name.max)
    .min(3, categoryErrorLabels.name.min)
});
