
import React from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import Reset from '../Reset/Reset'
const styles = {

  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#757575',
    textDecoration: 'none',
  },
  sidebarSubLink: {
    display: 'block',
    color: '#757575',
    textDecoration: 'none',
    padding:'5px',
    paddingLeft: '10px'
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#757575',
  },
  content: {
    padding: '16px',
    width: '140px',
    paddingRight:'8px',
    marginTop:'30px',
  },
};

//This component is meant to hold all of the menu options 
const SidebarContent = (props) => {

  return (

      <div style={styles.content}>
        <Link to={`/save_load`} style={styles.sidebarLink}>Save & Load</Link>
        <Link to={`/edit`} style={styles.sidebarLink}> Edit Collection </Link>
        <Reset stlye={styles.sidebarLink} />
        <div style={styles.divider} />
        <Link to={`/traceSelection`} style={styles.sidebarLink}>Trace Selection</Link>
        <Link to={`/traceSelection/point`} style={styles.sidebarSubLink}>• Point</Link>
        <Link to={`/traceSelection/line`} style={styles.sidebarSubLink}>• Line</Link>
        <Link to={`/traceSelection/circle`} style={styles.sidebarSubLink}>• Circle</Link>
        <Link to={`/traceSelection/rectangle`} style={styles.sidebarSubLink}>• Rectangle</Link>

        <Link to={`/traceSelection/circle_polar`} style={styles.sidebarSubLink}>• Circle Polar</Link>
        <Link to={`/traceSelection/rectangle_polar`} style={styles.sidebarSubLink}>• Rectangle Polar</Link>
        <Link to={`/traceSelection/sphere`} style={styles.sidebarSubLink}>• Sphere</Link>
      </div>

  );
};

SidebarContent.propTypes = {
  style: PropTypes.object,
};

export default SidebarContent;
