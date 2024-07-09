import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const pegawai = [...Array(5)].map(() => ({
  id: faker.datatype.uuid(),
  name: sample([' RIRI NOVASARI, SH ', ' HASNIJAL ', ' SUYONO, SE ']),
  email: sample(['riri@gmail.com', 'hasnijal@gmail.com', 'suyono@gmail.com']),
  nip: sample([ '19841018 201001 2 015', ' 19720609 200701 1 003 ', ' 19651014 199803 1 003 ']),
  status: sample(['active']),
  bidang: sample([
    'Kepegawaian dan Umum',
    'Pembinaan Kearsipan',
  ]),
}));

export default pegawai;
