import { useLink } from "@refinedev/core";
import { Logo } from "./styled";
import { BikeWhiteIcon, FineFoodsIcon } from "../icons";
import { theme } from "antd";

const { useToken } = theme;



export const Title = ({ collapsed }) => {
    const { token } = useToken();
    const Link = useLink();
    return (
        <Logo>
            <Link to="/">
                {collapsed ? (
                    <BikeWhiteIcon
                        style={{
                            fontSize: "32px",
                            color: token.colorTextHeading,
                        }}
                    />
                ) : (
                    <img src="dellIcon.ico" alt="Logo" style={{ width: "32px", height: "auto" }} />

                )}
            </Link>
        </Logo>
    );
};