import { ref } from 'vue';
import { defineComponent, h, watch } from 'vue';
import { MenuItems, MenuItemType } from './const.data';
import { Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'custom-menu',
  setup() {
    const router = useRouter();
    const selectedKeys = ref<string[]>([]);

    /**
     * 监听路由变化选中菜单
     */
    watch(
      () => router,
      () => {
        selectedKeys.value = [router.currentRoute.value.path];
      },
      {
        immediate: true,
      }
    );

    const createMenuItem = (menuItems: MenuItemType[]) => {
      return menuItems.map((item) => {
        return item.children ? (
          <SubMenu
            key={item.key}
            v-slots={{
              title: () => <span>{item.label}</span>,
              icon: () => (item.icon ? h(item.icon) : null),
            }}
          >
            {createMenuItem(item.children)}
          </SubMenu>
        ) : (
          <MenuItem
            key={item.key}
            v-slots={{
              icon: () => (item.icon ? h(item.icon) : null),
            }}
            onClick={() => {
              router.push({ path: item.path });
            }}
          >
            <span>{item.label}</span>
          </MenuItem>
        );
      });
    };

    return () => {
      return (
        <>
          <Menu
            // @ts-ignore
            vModel={[selectedKeys.value, 'selectedKeys']}
            theme="dark"
            mode="inline"
          >
            {createMenuItem(MenuItems)}
          </Menu>
        </>
      );
    };
  },
});
