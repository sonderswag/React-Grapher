import React, {Component} from 'react';
import SidebarContent from './sidebar_content'

const styles = {
  Menu: {
    position: 'fixed',
    display: 'block',
    width: '180px',
    height: '100%',
    backgroundColor: 'white',
    boxShadow:'0 0 4px 3px #F0F0F0',

  },
  MenuHeader: {
    position: 'fixed',
    width: '180px',
    backgroundColor: '#2780E3',
    height:'40px',
    boxShadow:'0 -10px 9px 9px #0C6EDC',
  },
  MenuTitle: {
    color:'White',
    fontSize: '20px',
    padding: '10px',
  },
  Header: {
    position:'fixed',
    display: 'block',
    right:'0',
    height:'40px',
    background: '#2780E3',
  }

}

//NOTE:: if You want to add an element to the menu, add it in the Sidebar_content
class Sidebar extends Component {

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
 updateWindowDimensions = () => {
  this.forceUpdate()
  }

  render() {
    return (
      <div>
        <div style={Object.assign({},styles.Header,{width:(window.innerWidth-180)+'px'})}>
          <p style={{paddingLeft:'15px', marginTop:'10px', color:'White',fontSize: '20px',}}> Grapher </p>
        </div>
        <div style={styles.Menu}>
          <div style={styles.MenuHeader}>
            <div style={styles.MenuTitle}>
              Menu
            </div>

          </div>
          {SidebarContent()}
        </div>
      </div>
    )
  }
}


export default Sidebar;
