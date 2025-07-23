import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

const routes = [
  { title: "Home", icon: "fas-solid fa-house", path: "/" },
  { title: "Sales", icon: "chart-line", path: "/sales" },
  { title: "Costs", icon: "chart-column", path: "/costs" },
  { title: "Payments", icon: "wallet", path: "/payments" },
  { title: "Finances", icon: "chart-pie", path: "/finances" },
  { title: "Messages", icon: "envelope", path: "/messages" },
];

const bottomRoutes = [
  { title: "Settings", icon: "sliders", path: "/settings" },
  { title: "Support", icon: "phone-volume", path: "/support" },
];

const SidebarWrapper = styled.div`
  width: ${(props) => (props.$isOpened ? "250px" : "80px")};
  background-color: var(--color-sidebar-background-${(props) => props.$theme}-default);
  color: var(--color-text-${(props) => props.$theme}-default);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 100px;
  transition: 0.3s ease;
  border: 2px solid #ebeff5;
  border-radius: 20px;
`;

const LogoBlock = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  position: relative;
  gap: 0.5rem;

  img {
    width: 40px;
    flex-shrink: 0;
  }

  span {
    color: var(--color-text-logo-${(props) => props.$theme}-default);
    font-weight: bold;
    transition: opacity 0.3s ease, transform 0.3s ease;
    opacity: ${(props) => (props.$isOpened ? "1" : "0")};
    transform: ${(props) => (props.$isOpened ? "translateX(0)" : "translateX(-10px)")};
    white-space: nowrap;
  }

  button {
    border: none;
    color: var(--color-sidebar-background-${(props) => props.$theme}-default);
    cursor: pointer;
    background: #e2e8f0;
    padding: 10px;
    border-radius: 100%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: ${(props) => (props.$isOpened ? "-16px" : "-40px")};
    transition: 0.2s ease-in-out;
    background: var(--color-text-${(props) => props.$theme}-default);

    svg {
      transition: transform 0.3s ease;
    }
  }
`;

const NavBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 10px;

  div {
    padding: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: 600;
    transition: 0.1s ease-in-out;
    border-radius: 10px;

    &:hover {
      background-color: var(--color-sidebar-background-${(props) => props.$theme}-hover);
      color: var(--color-text-${(props) => props.$theme}-hover);
    }

    &.active {
      background-color: var(--color-sidebar-background-${(props) => props.$theme}-active);
      color: var(--color-text-${(props) => props.$theme}-active);
    }

    span {
      transition: opacity 0.3s ease, transform 0.3s ease;
      opacity: ${(props) => (props.$isOpened ? "1" : "0")};
      transform: ${(props) => (props.$isOpened ? "translateX(0)" : "translateX(-10px)")};
      white-space: nowrap;
    }
  }
`;

const Sidebar = ({ color, toggleTheme }) => {
  const [isOpened, setIsOpened] = useState(true);
  const navigate = useNavigate();

  const goToRoute = (path) => {
    navigate(path);
  };

  const toggleSidebar = () => {
    setIsOpened((v) => !v);
  };

  return (
    <SidebarWrapper $theme={color} $isOpened={isOpened}>
      <div>
        <LogoBlock $theme={color} $isOpened={isOpened}>
          <img src={logo} alt="TensorFlow logo" />
          <span>TensorFlow</span>
          <button onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isOpened ? "angle-left" : "angle-right"} />
          </button>
        </LogoBlock>
        <NavBlock $theme={color} $isOpened={isOpened}>
          {routes.map((route) => (
            <div
              key={route.title}
              onClick={() => goToRoute(route.path)}
              className={classNames({ active: location.pathname === route.path })}
            >
              <FontAwesomeIcon icon={route.icon} />
              <span>{route.title}</span>
            </div>
          ))}
        </NavBlock>
      </div>
      <NavBlock $theme={color} $isOpened={isOpened}>
        {bottomRoutes.map((route) => (
          <div key={route.title} onClick={() => goToRoute(route.path)}>
            <FontAwesomeIcon icon={route.icon} />
            <span>{route.title}</span>
          </div>
        ))}
        <div onClick={toggleTheme}>
          <FontAwesomeIcon icon="sun" />
          <span>Сменить тему</span>
        </div>
      </NavBlock>
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  toggleTheme: PropTypes.func,
};

export default Sidebar;
