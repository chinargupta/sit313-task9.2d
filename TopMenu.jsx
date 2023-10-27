import React from 'react'
import { Input, Menu } from 'semantic-ui-react'

// Define a functional component called TopMenu
function TopMenu() {
  return (
    // Render a Semantic UI React Menu component with secondary styling
    <Menu secondary>
      {/* Menu item with the text "Dev @ Deakin" */}
      <Menu.Item>Dev @ Deakin</Menu.Item>

      {/* Input field with an icon for search */}
      <Input style={{ width: '60%', margin: "auto" }} iconPosition='left' icon='search' placeholder='Search...' />

      {/* Menu items positioned to the right */}
      <Menu.Menu position="right">
        {/* Menu item with the text "Post" */}
        <Menu.Item>
          Post
        </Menu.Item>

        {/* Menu item with a link to the '/login' route */}
        <Menu.Item name='login'>
          <a href='/login'>Login</a>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

// Export the TopMenu component as the default export
export default TopMenu
