import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
import * as MdIcons from "react-icons/md";


export const SidebarData = [
  {
    title: 'Home',
    path: '/',
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
    title: 'Experiments',
    path: '/experiments',
    icon: <AiIcons.AiOutlineExperiment />,
    cName: 'nav-text'
  },
  {
    title: 'Sensors',
    path: '/sensors',
    icon: <MdIcons.MdInsights />,
    cName: 'nav-text'
  },
  {
    title: 'Reactors',
    path: '/reactors',
    icon: <GiIcons.GiReactor />,
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
  }
];