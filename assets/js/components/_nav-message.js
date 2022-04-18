import React, {Component} from 'react';
import {Link, Icon, Text, Colors, NavMessageItem, NavDivider} from '.';
import userImage1 from '../../images/user1-128x128.jpg';
import userImage2 from '../../images/user4-128x128.jpg';
import userImage3 from '../../images/user3-128x128.jpg';
import PropTypes from 'prop-types';

export class NavMessage extends Component {
    render() {
        const {total = 0} = this.props;

        return (
            <li className="nav-item dropdown d-none">
                <Link className="nav-link" data-bs-toggle="dropdown">
                    <Icon name="comments"/>
                    <Text className="badge badge-danger navbar-badge">
                        {total}
                    </Text>
                </Link>
                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                    <Link className="dropdown-item">
                        {total} Notification{total > 1 ? 's' : ''}
                    </Link>
                    <NavMessageItem avatar={userImage1} name="Nhật Đỗ"
                        title="Gọi lại cho tôi nhé..." time="15 minutes ago"
                        color={Colors.red}/>
                    <NavDivider/>
                    <NavMessageItem avatar={userImage2} name="Phúc Nguyễn" title="Alo alo 123..."
                        time="3 hours ago" color={Colors.blue}/>
                    <NavDivider/>
                    <NavMessageItem avatar={userImage3} name="Đạt Nguyễn"
                        title="Test thử message..." time="2 days ago"/>
                    <NavDivider/>
                    <Link className="dropdown-item dropdown-footer">
                        See All Messages
                    </Link>
                </div>
            </li>
        );
    }
}

NavMessage.propTypes = {
    total: PropTypes.number
};
