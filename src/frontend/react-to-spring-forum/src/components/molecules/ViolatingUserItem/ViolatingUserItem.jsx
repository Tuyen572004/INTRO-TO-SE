import {Dropdown} from "react-bootstrap";
import CustomToggle from "../../atoms/CustomToggle/CustomToggle";

import s from './style.module.css';

function ViolatingUserItem({ user }) {
  return (
      <div key={user.id} className={s.violatingUserItem}>
          <img src={user.avatar} alt={user.name} className={s.avatar}/>

          <div className={s.details}>
              <h6>{user.name}</h6>
              <small>@{user.username}</small>
          </div>

          <div className={s.reason}>
              {user.reasons.join(', ')}
          </div>

          <Dropdown>
              <Dropdown.Toggle as={CustomToggle}/>
              <Dropdown.Menu>
                  <Dropdown.Item>Block</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
              </Dropdown.Menu>
          </Dropdown>
      </div>
  );
}

export default ViolatingUserItem;