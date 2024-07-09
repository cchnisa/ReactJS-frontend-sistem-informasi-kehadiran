import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const presensi = [...Array(10)].map(() => ({
  id: faker.datatype.uuid(),
  name: sample(['RIRI NOVASARI, SH', 'ANDINI AISYAH', 'NURUL AFIFAH', 'AZDRA NABILA', 'REZKY KURNIAWAN']),
  nip: sample(['19841018 201001 2 015']),
  tanggal: sample(['09/07/2022', '10/10/2022']),
  jamMasuk: sample(['08.00', '07.30']),
  jamKeluar: sample(['17.00']),
}));

export default presensi;
