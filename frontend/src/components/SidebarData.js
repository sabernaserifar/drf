import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as TbIcons from "react-icons/tb";








export const SidebarData = [
  {
    title: 'Inventory',
    path: '/inventories',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Purchases',
    path: '/purchases',
    icon: <AiIcons.AiOutlineShoppingCart />,
    cName: 'nav-text'
  },

  {
    title: 'Operarions',
    path: '/operations',
    icon: <AiIcons.AiOutlineExperiment />,
    cName: 'nav-text'
  },
  {
    title: 'Equipment',
    path: '/equipments',
    icon: <GiIcons.GiReactor />,
    cName: 'nav-text'
  },
  {
    title: 'Maintenance',
    path: '/maintenances',
    icon: <GiIcons.GiAutoRepair />,
    cName: 'nav-text'
  },
  {
    title: 'Files',
    path: '/file_uploads',
    icon: <BiIcons.BiFile />,
    cName: 'nav-text'
  },
  {
    title: 'Sensors',
    path: '/sensors_data',
    icon: <MdIcons.MdInsights />,
    cName: 'nav-text'
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: <FaIcons.FaPeopleArrows />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: <AiIcons.  AiOutlineDollar />,
    cName: 'nav-text'
  },
  {
    title: 'Delivery',
    path: '/deliveries',
    icon: <TbIcons.TbTruckDelivery />,
    cName: 'nav-text'
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Plot',
    path: '/plot',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },

];