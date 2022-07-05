import { createContext, useState, useEffect } from "react";
import { Magic } from "magic-sdk";
import { ProductService } from "../../api/productService";

const AuthContext = createContext();

let magic;
export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const loginUser = async (email) => {
        try {
            await magic.auth.loginWithMagicLink({ email });
            setUser({ email });
            const loggedUser = await ProductService.getInstance().getUser(email, token);
            localStorage.setItem('userId', loggedUser[0].id);
        } catch (err) {
            setUser(null);
        }
    };

    const logoutUser = async () => {
        try {
            await magic.user.logout();
            setUser(null);
            localStorage.removeItem('userId');
        } catch (err) {}
    };

    const checkUserLoggedIn = async () => {
        try {
            const isLoggedIn = await magic.user.isLoggedIn();

            if (isLoggedIn) {
                const { email } = await magic.user.getMetadata();
                setUser({ email });
                // just for testing
                const token = await getToken();
                setToken(token);
                console.log("checkUserLoggedin token", token);

                const loggedUser = await ProductService.getInstance().getUser(email, token);
                localStorage.setItem('userId', loggedUser[0].id);
            }
        } catch (err) {}
    };
    //retrieves the Magic Issues Bearer token//
    // this allows User to make authenticated requests//
    const getToken = async () => {
        try {
            const token = await magic.user.getIdToken();
            setToken(token);
            return token;
        } catch (err) {}
    };
    useEffect(() => {
        magic = new Magic(process.env.REACT_APP_MAGIC_KEY);

        checkUserLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loginUser, logoutUser, getToken, token }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
