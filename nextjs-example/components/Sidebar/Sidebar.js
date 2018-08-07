import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Link from 'next/link';
import Router from 'next/router';

import { authActions } from '../../actions';
import { User } from '../User/User';
import { Logo, Logout, LogoWrapp, MenuLink, MenuList, MenuListItem, MenuWrapp, SidebarLayout } from './Sidebar.style';

const MENU = {
  top: [
    { title: 'Кандидаты', url: '/candidates' },
    { title: 'Вакансии', url: '/vacancies' },
    { title: 'Собеседования', url: '/inteviews' },
    { title: 'Офферы', url: '/offers' },
    { title: 'Комментарии', url: '/comments' },
    { title: 'Коммуникация', url: '/communication' },
  ],
  middle: [
    { title: 'Статистиика', url: '/statictic' },
    { title: 'Архив', url: '/archive' },
  ],
};

@connect(
  state => ({ user: state.user }),
  dispatch => ({
    actions: bindActionCreators({ logout: authActions.logout }, dispatch),
  }),
)
export class Sidebar extends React.PureComponent {
  onLogoutClick = () => this.props.actions.logout(() => Router.push('/login'));

  getMenu(config) {
    const { currentUrl = '' } = this.props;
    return (
      <MenuList>
        {config.map(({ title, url }) => (
          <MenuListItem key={title + url}>
            <Link href={url}>
              <MenuLink active={currentUrl.includes(url)}>{title}</MenuLink>
            </Link>
          </MenuListItem>
        ))}
      </MenuList>
    );
  }

  render() {
    const { user } = this.props;
    return (
      <SidebarLayout>
        <LogoWrapp>
          <Logo src='/static/img/logo.svg' />
        </LogoWrapp>
        <MenuWrapp>
          {this.getMenu(MENU.top)}
          {this.getMenu(MENU.middle)}
          <MenuList last={true}>
            <li>
              <User img={user.picture} name={user.given_name}/>
            </li>
            <li>
              <Logout onClick={this.onLogoutClick}>Выход</Logout>
            </li>
          </MenuList>
        </MenuWrapp>
      </SidebarLayout>
    );
  }
}
