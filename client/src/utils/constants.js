import { FiInfo, FiLogOut, FiUser } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { MdOutlineCategory, MdTravelExplore } from 'react-icons/md';
import { GrPieChart } from 'react-icons/gr';

export const sidebar_links = [
  {
    key: 'trips',
    label: 'Trips',
    privilege: 'user',
    icon: <MdTravelExplore />,
  },
  {
    key: 'transactions',
    label: 'Transactions',
    privilege: 'user',
    icon: <RiMoneyDollarCircleLine />,
  },
  {
    key: 'categories',
    label: 'Categories',
    privilege: 'admin',
    icon: <MdOutlineCategory />,
  },
  {
    key: 'overview',
    label: 'Overview',
    privilege: 'user',
    icon: <GrPieChart />,
  },
];

export const sidebar_bottom_links = [
  {
    key: 'settings',
    label: 'Profile',
    icon: <FiUser />,
  },
  {
    key: 'aboutus',
    label: 'About us',
    icon: <FiInfo />,
  },
  {
    key: 'logout',
    label: 'Logout',
    icon: <FiLogOut />,
  },
];
