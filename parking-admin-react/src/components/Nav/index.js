import React from 'react';
import PropTypes from 'prop-types';

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <button onClick={() => props.display_form('login')}>login</button>
    </ul>
  );

  const logged_in_nav = (
      <h5>
          {props.logged_in
                ? `Hola, ${props.display_name}`
                : 'Please Log In'}
          <button className="btn btn-link" onClick={props.handle_logout}>Salir</button>
      </h5>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};