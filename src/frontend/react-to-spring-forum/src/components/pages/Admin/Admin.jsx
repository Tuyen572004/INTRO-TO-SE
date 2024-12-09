import { NavLink, Outlet } from 'react-router-dom';
import {AlertTriangle, UserX, LayoutDashboard} from "lucide-react";

import s from './style.module.css';

const Admin = () => {
    return (
        <div className="container-fluid">
            <header>
                <nav className="d-flex justify-content-around m-3">
                    <NavLink
                        to=""
                        end
                        className={({isActive}) =>
                            `${s.navLink} ${isActive ? s.active : ""}`
                        }
                    >
                        <LayoutDashboard className={s.icon}/>
                    </NavLink>
                    <NavLink
                        to="violating-users"
                        className={({isActive}) =>
                            `${s.navLink} ${isActive ? s.active : ""}`
                        }
                    >
                        <UserX className={s.icon}/>
                    </NavLink>
                    <NavLink
                        to="violating-posts"
                        className={({isActive}) =>
                            `${s.navLink} ${isActive ? s.active : ""}`
                        }
                    >
                        <AlertTriangle className={s.icon}/>
                    </NavLink>
                </nav>
                <hr/>
            </header>
            <main>
            <Outlet />
            </main>
        </div>
    );
};

export default Admin;
