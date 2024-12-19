import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import s from "./style.module.css";
import { CiSearch } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import UserSearchList from "../../organisms/UserSearchList/UserSearchList";
import {UserAPI} from "../../../api/UserAPI";

const SearchBar = () => {
    const [searchContent, setSearchContent] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const containerRef = useRef(null);

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

    const handleSearchInput = async (e) => {
        setSearchContent(e.target.value);
        setShowResults(true);

        if (e.target.value) {
            try {
                const response = await UserAPI.getUserByUsernameContaining(e.target.value);
                setUsers(response.data);

                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        } else {
            setUsers([]);
        }
    };

    const handleClearSearchInput = () => {
        setSearchContent("");
        setShowResults(false);
    };

    const handleFocus = () => {
        setIsFocused(true);
        setShowResults(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchContent) {
            setSearchContent("");
            navigate(`/search?title=${encodeURIComponent(searchContent)}`);
        }
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShowResults(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={s.container} ref={containerRef}>
            <div
                className={s.search_bar_container}
                style={{
                    backgroundColor: isFocused ? "white" : "#F5F5F5",
                    border: isFocused ? "1px solid black" : "none",
                }}
            >
                <CiSearch/>
                <input
                    className={s.search_bar}
                    type="text"
                    placeholder="Search"
                    value={searchContent}
                    onChange={handleSearchInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyPress={handleKeyPress}
                />
                {searchContent && <IoCloseSharp onClick={handleClearSearchInput}/>}
            </div>

            {(showResults && searchContent && users.length > 0 && (
                <div className={s.search_result_container}>
                    <UserSearchList users={users} searchContent={searchContent}/>
                </div>
            ))}
        </div>
    );
};

export default SearchBar;