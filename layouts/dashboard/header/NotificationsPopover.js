import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState, useCallback, useEffect, useContext } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  CircularProgress,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// _mock_
import { _notifications } from '../../../_mock';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth';
import EmptyContent from '../../../components/EmptyContent';
import { SocketContext } from '../../../socket/socket';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const n = useAuth();
  const [notifications, setNotifications] = useState(n.notifications);
  const [loading, setLoading] = useState(true);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.emit('subscribe', { room: n.user.email });
    socket.on('connect', () => {
      socket.emit('subscribe', { room: n.user.email });
    });

    return () => {
      socket.off('connect');
    };
  }, [socket]);
  const getNotifications = useCallback(async () => {
    try {
      const response = await axios.post('/api/account/notifications');
      setNotifications(response.data.notifications);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [notifications]);

  ///mark as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await axios.post('/api/account/notifications/read');
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          read_at: false,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  }, [notifications]);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
    getNotifications();
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <>
      <IconButtonAnimate
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{ width: 40, height: 40 }}
      >
        <Badge
          badgeContent={notifications.filter((item) => item.read_at === null).length}
          color="error"
        >
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        {loading ? (
          <Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 180 }}
          >
            <Box>
              <CircularProgress size={20} />
            </Box>
          </Box>
        ) : !loading && notifications.length === 0 ? (
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <EmptyContent
              title={'Empty'}
              img={'/images/notifications.jpg'}
              description={'no notifications'}
            />
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">Notifications</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  You have {notifications.filter((item) => item.read_at === null).length} unread
                  messages
                </Typography>
              </Box>

              {notifications.length > 0 && (
                <Tooltip title=" Mark all as read">
                  <IconButtonAnimate color="primary" onClick={handleMarkAllAsRead}>
                    <Iconify icon="eva:done-all-fill" width={20} height={20} />
                  </IconButtonAnimate>
                </Tooltip>
              )}
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ height: { xs: 340, sm: 340 } }}>
              <List disablePadding>
                {notifications.map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}
              </List>

              {/*
              <List
                disablePadding
                subheader={
                  <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                    Before that
                  </ListSubheader>
                }
              >
                {notifications.slice(2, 5).map((notification) => (
                  <NotificationItem key={notification.id} notification={notification} />
                ))}

              </List>
              */}
            </Scrollbar>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box sx={{ p: 1 }}>
              <Button fullWidth disableRipple>
                View All
              </Button>
            </Box>
          </>
        )}
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.read_at == null && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.updated_at)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const { data } = notification;
  notification = data;
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_package.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_shipping.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_mail.svg"
        />
      ),
      title,
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: (
        <img
          alt={notification.title}
          src="https://minimal-assets-api.vercel.app/assets/icons/ic_notification_chat.svg"
        />
      ),
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}
