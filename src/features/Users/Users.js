import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import TableContainer from '@material-ui/core/TableContainer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import { NavBar } from '../../components/NavBar';
import { Loading } from '../../components/Loading';

const RANDOM_USERS_API = 'https://randomuser.me/api/?results=25';

const Users = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [fetchedUsers, loading, error] = useFetch({
    url: `${RANDOM_USERS_API}&page=${page}`,
    deps: [page],
  });

  const addUsers = (usersToAdd) => {
    setUsers([...users, ...usersToAdd]);
  };

  useEffect(() => {
    if (fetchedUsers?.results) {
      addUsers(
        fetchedUsers.results.map((user) => ({
          firstName: user.name.first,
          lastName: user.name.last,
          email: user.email,
          phone: user.phone,
          country: user.location.country,
          gender: user.gender,
          avatar: {
            large: user.picture.large,
            medium: user.picture.medium,
            thumb: user.picture.thumbnail,
          },
        }))
      );
    }
  }, [fetchedUsers]);
  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <TableContainer
          style={{ maxHeight: 'calc(100vh - 65px)' }}
          onScroll={({ target }) => {
            if (target.scrollTop == target.scrollHeight - target.clientHeight) {
              setPage(page + 1);
            }
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="left" />
                <TableCell align="center">name</TableCell>
                <TableCell align="center">phone</TableCell>
                <TableCell align="center">email</TableCell>
                <TableCell align="right">country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                ? users.map((user) => {
                    return (
                      <TableRow key={user.phone}>
                        <TableCell align="left">
                          <Avatar src={user.avatar.thumb} />
                        </TableCell>
                        <TableCell align="center">
                          {user.firstName} {user.lastName}
                        </TableCell>
                        <TableCell align="center">{user.phone}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="right">{user.country}</TableCell>
                      </TableRow>
                    );
                  })
                : 'No users'}
            </TableBody>
          </Table>
        </TableContainer>
        <ErrorDialog open={error} />
        <Snackbar open={loading}>
          <Loading />
        </Snackbar>
      </Container>
    </>
  );
};

const ErrorDialog = ({ open }) => {
  const router = useRouter();
  return (
    <Dialog open={open} aria-labelledby="alert-dialog-title">
      <DialogTitle>Can't get list, try again</DialogTitle>
      <DialogActions>
        <Button onClick={() => router.reload()} color="primary" autoFocus>
          Reload Page
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(Users);
