import {
  UnorderedListOutlined,
  DesktopOutlined,
  ProfileOutlined,
} from '@ant-design/icons-vue';

export interface MenuItemType {
  key: string;
  path: string;
  icon: unknown;
  label: string;
  children: null | MenuItemType[];
}

export const MenuItems: MenuItemType[] = [
  {
    key: '/admin/cameraList',
    path: '/admin/cameraList',
    icon: UnorderedListOutlined,
    label: '数据源管理',
    children: null,
  },
  {
    key: '/',
    path: '/',
    icon: DesktopOutlined,
    label: '大屏展示',
    children: null,
  },
  {
    key: '/admin/record',
    path: '/admin/record',
    icon: ProfileOutlined,
    label: '识别结果管理',
    children: null,
  },
];
