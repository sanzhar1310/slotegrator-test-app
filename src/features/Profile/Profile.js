import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Image from 'material-ui-image';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { NavBar } from '../../components/NavBar';
import { TabPanel } from '../../components/TabPanel';
import { Loading } from '../../components/Loading';
import { selectUserContacts, selectUserData } from '../../selectors/userSelectors';
import { setUserContacts, setUserData } from '../../actionCreators/userActions';
import { useAuth } from '../../hooks/useAuth';
import { useReduxFetch } from '../../hooks/useReduxFetch';

const RANDOM_USER_API = 'https://randomuser.me/api';
const RANDOM_USERS_API = 'https://randomuser.me/api/?results=25';

const useStyles = makeStyles((theme) => ({
  profileContainer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  profileAvatar: {
    width: '',
  },
  profileCover: {
    width: '100%',
  },
  userName: {
    marginTop: theme.spacing(2),
  },
  tabs: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
}));



const Profile = () => {
  const router = useRouter();
  const styles = useStyles();
  const dispatch = useDispatch();

  const [fakeUser, loadingUser] = useReduxFetch({
    dispatch,
    action: setUserData,
    selector: selectUserData,
    url: RANDOM_USER_API,
  });
  const [contacts] = useReduxFetch({
    dispatch,
    action: setUserContacts,
    selector: selectUserContacts,
    url: RANDOM_USERS_API,
  });

  const [currentTab, setCurrentTab] = useState(0);

  const [isAuth, loadingPage] = useAuth();

  if (loadingPage || loadingUser) {
    return <Loading full />;
  } else if (!isAuth) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <NavBar />
      <Container className={styles.profileContainer} maxWidth="md">
        <Box maxWidth="250px" width="50%" borderRadius="50%" overflow="hidden">
          <Image src={fakeUser.avatar.large} />
        </Box>
        <Typography variant="h5" className={styles.userName}>
          {fakeUser.firstName} {fakeUser.lastName}
        </Typography>
        <Tabs
          className={styles.tabs}
          variant="fullWidth"
          value={currentTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newTab) => setCurrentTab(newTab)}
        >
          <Tab label="info" />
          <Tab label="contacts" />
        </Tabs>
        <TabPanel
          value={currentTab}
          index={0}
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
        >
          <Box width="100%" maxWidth="500px" overflow="auto">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell align="left">gender</TableCell>
                  <TableCell align="right">{fakeUser.gender}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">email</TableCell>
                  <TableCell align="right">{fakeUser.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">phone</TableCell>
                  <TableCell align="right">{fakeUser.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">country</TableCell>
                  <TableCell align="right">{fakeUser.country}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </TabPanel>
        <TabPanel value={currentTab} index={1} style={{ width: '100%' }}>
          <Box width="100%" overflow="auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">name</TableCell>
                  <TableCell align="center">phone</TableCell>
                  <TableCell align="center">email</TableCell>
                  <TableCell align="right">country</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts
                  ? contacts.map((contact) => {
                      return (
                        <TableRow key={contact.phone}>
                          <TableCell align="left">
                            {contact.firstName} {contact.lastName}
                          </TableCell>
                          <TableCell align="center">{contact.phone}</TableCell>
                          <TableCell align="center">{contact.email}</TableCell>
                          <TableCell align="right">{contact.country}</TableCell>
                        </TableRow>
                      );
                    })
                  : 'No contacts'}
              </TableBody>
            </Table>
          </Box>
        </TabPanel>
      </Container>
    </>
  );
};

export default memo(Profile);
