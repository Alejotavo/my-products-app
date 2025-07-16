import { Tab, Tabs } from "react-bootstrap";
import ProductList from "../productList/productList";
import UserList from "../userList/userList";

function TabControl() {

  return (
    <Tabs
      defaultActiveKey="users"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="users" title="Users">
        <UserList />
      </Tab>
      <Tab eventKey="products" title="Products">
        <ProductList />
      </Tab>
    </Tabs>

  );
}

export default TabControl;
