const logOutController = {};

logOutController.LogOut = async (req, res) => {
    try {
        res.clearCookie("authCookie");
        return res.status(200).json({ message: "LogOut complete. Bye" });
    } catch (error) {
        console.log("Error en logOut: ", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

export default logOutController;