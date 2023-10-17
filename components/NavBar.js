/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>100 Thieves</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Link passHref href="/members">
              <Nav.Link>Members</Nav.Link>
            </Link>
            <Link passHref href="/member/new">
              <Nav.Link>Add Member</Nav.Link>
            </Link>
            <Button type="button" className="btn-danger" onClick={signOut}>Sign Out</Button>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
