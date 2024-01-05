import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'bx-home-circle',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARDS.LIST.DEFAULT',
                link: '/dashboard',
                parentId: 2
            }
        ]
    },
    {
        id: 8,
        isLayout: true
    }, {
        id: 40,
        label: 'MENUITEMS.CATEGORIES.TEXT',
        icon: 'bx-briefcase-alt-2',
        subItems: [
            {
                id: 42,
                label: 'MENUITEMS.CATEGORIES.LIST.CATEGORYLIST',
                link: '/admin/categories/list',
                parentId: 40
            },
            {
                id: 41,
                label: 'MENUITEMS.CATEGORIES.LIST.GRID',
                link: '/admin/categories/grid',
                parentId: 40
            },
            {
                id: 43,
                label: 'MENUITEMS.CATEGORIES.LIST.OVERVIEW',
                link: '/admin/categories/overview',
                parentId: 40
            },
            {
                id: 44,
                label: 'MENUITEMS.CATEGORIES.LIST.CREATE',
                link: '/admin/categories/create',
                parentId: 40
            }
        ]
    },
    {
        id: 57,
        label: 'MENUITEMS.PRODUCTS.TEXT',
        icon: 'bx-briefcase-alt',
        subItems: [
            {
                id: 58,
                label: 'MENUITEMS.PRODUCTS.LIST.PRODUCTLIST',
                link: '/admin/products/list',
                parentId: 57
            },
            {
                id: 59,
                label: 'MENUITEMS.PRODUCTS.LIST.PRODUCTGRID',
                link: '/admin/products/grid',
                parentId: 57
            },
            {
                id: 60,
                label: 'MENUITEMS.PRODUCTS.LIST.APPLYPRODUCT',
                link: '/admin/products/apply',
                parentId: 57
            },
            {
                id: 61,
                label: 'MENUITEMS.PRODUCTS.LIST.PRODUCTDETAILS',
                link: '/admin/products/details',
                parentId: 57
            },
            {
                id: 62,
                label: 'MENUITEMS.PRODUCTS.LIST.PRODUCTCATEGORIES',
                link: '/admin/products/categories',
                parentId: 57
            }
        ]
    }
];

