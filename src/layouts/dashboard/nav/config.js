// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'data pegawai',
    path: '/dashboard/pegawai',
    icon: icon('ic_datapegawai'),
  },
  {
    title: 'data presensi',
    path: '/dashboard/presensi',
    icon: icon('ic_datapresensi'),
  },
];

export default navConfig;
