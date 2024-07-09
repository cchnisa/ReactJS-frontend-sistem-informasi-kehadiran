
import { faker } from '@faker-js/faker';
import { sample } from 'lodash';import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';

// ----------------------------------------------------------------------
const pegawai = [...Array(20)].map(() => ({
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

const presensi = [...Array(3)].map(() => ({
  id: faker.datatype.uuid(),
  name: sample(['RIRI NOVASARI, SH', 'SUYONO, SE']),
  nip: sample(['19841018 201001 2 015']),
  tanggal: sample(['09/07/2022', '10/10/2022']),
  jamMasuk: sample(['08.00']),
  jamKeluar: sample(['17.00']),
}));

const tidakHadir = [...Array(17)].map(() => ({
  id: faker.datatype.uuid(),
  name: sample(['RIRI NOVASARI, SH','MANOHARA','KIKI SAPUTRI']),
}));

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Pegawai" total={pegawai.length} icon={'ant-design:team-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Sudah Presensi" total={presensi.length} color="info" icon={'ant-design:check-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Belum Presensi" total={tidakHadir.length} color="warning" icon={'ant-design:exclamation-circle-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Grafik Presensi"
              subheader=""
              chartLabels={[
                '01/01/2021',
                '02/01/2021',
                '03/01/2021',
                '04/01/2021',
                '05/01/2021',
                '06/01/2021',
                '07/01/2021',
                '08/01/2021',
                '09/01/2021',
                '10/01/2021',
                '11/01/2021',
              ]}
              chartData={[
                {
                  name: 'Terlambat',
                  type: 'column',
                  fill: 'solid',
                  data: [5, 2, 3, 7, 3, 9, 3, 3, 5, 4, 5],
                },
                {
                  name: 'Hadir Tepat Waktu',
                  type: 'area',
                  fill: 'gradient',
                  data: [19, 20, 20, 19, 18, 15, 17, 13, 19, 14, 20],
                },
                {
                  name: 'Tidah Hadir',
                  type: 'line',
                  fill: 'solid',
                  data: [2, 4, 3, 5, 1, 2, 6, 1, 2, 0, 0],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Persentase Kedisiplinan"
              chartData={[
                { label: 'Tepat Waktu', value: 160 },
                { label: 'Terlambat', value: 20 },
                { label: 'Tidak Presensi', value: 10 },
              ]}
              chartColors={[theme.palette.primary.main, theme.palette.info.main, theme.palette.warning.main]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
