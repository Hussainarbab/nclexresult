document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log("Dashboard loading...");


        // =====================================
        // CHECK SUPABASE
        // =====================================

        if (!window.supabase) {

            console.error(
                "Supabase library not loaded."
            );

            return;
        }


        if (!supabaseClient) {

            console.error(
                "Supabase client not found."
            );

            return;
        }



        // =====================================
        // GET CURRENT SESSION
        // =====================================

        const {
            data: {
                session
            },
            error
        } =
            await supabaseClient.auth.getSession();


        if (error) {

            console.error(
                "Session error:",
                error
            );

            return;
        }



        // =====================================
        // USER NOT LOGGED IN
        // =====================================

        if (!session) {

            console.log(
                "No logged-in user."
            );

            window.location.href =
                "login.html";

            return;
        }



        // =====================================
        // CURRENT USER
        // =====================================

        const user =
            session.user;


        console.log(
            "Logged in:",
            user.email
        );



        // =====================================
        // GET PROFILE
        // =====================================

        let fullName = "Student";


        const {
            data: profile,
            error: profileError
        } =
            await supabaseClient
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .maybeSingle();


        if (profileError) {

            console.error(
                "Profile error:",
                profileError
            );

        }


        // =====================================
        // GET NAME
        // =====================================

        if (
            profile &&
            profile.full_name
        ) {

            fullName =
                profile.full_name;

        }

        else if (
            user.user_metadata &&
            user.user_metadata.full_name
        ) {

            fullName =
                user.user_metadata.full_name;

        }



        // =====================================
        // FIRST NAME
        // =====================================

        const firstName =
            fullName
                .trim()
                .split(" ")[0];


        // =====================================
        // ELEMENTS
        // =====================================

        const sidebarName =
            document.getElementById(
                "sidebarName"
            );


        const userName =
            document.getElementById(
                "userName"
            );


        const welcomeName =
            document.getElementById(
                "welcomeName"
            );


        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        const sidebarAvatar =
            document.getElementById(
                "sidebarAvatar"
            );



        // =====================================
        // SET NAME
        // =====================================

        if (sidebarName) {

            sidebarName.textContent =
                fullName;

        }


        if (userName) {

            userName.textContent =
                fullName;

        }


        if (welcomeName) {

            welcomeName.textContent =
                firstName;

        }



        // =====================================
        // SET AVATAR
        // =====================================

        const avatarLetter =
            firstName
                .charAt(0)
                .toUpperCase();


        if (userAvatar) {

            userAvatar.textContent =
                avatarLetter;

        }


        if (sidebarAvatar) {

            sidebarAvatar.textContent =
                avatarLetter;

        }



        // =====================================
        // LOGOUT
        // =====================================

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );


        if (logoutBtn) {

            logoutBtn.addEventListener(
                "click",
                async function () {


                    logoutBtn.disabled =
                        true;


                    logoutBtn.textContent =
                        "Logging out...";


                    const {
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signOut();


                    if (error) {

                        console.error(
                            "Logout error:",
                            error
                        );


                        alert(
                            "Logout failed: " +
                            error.message
                        );


                        logoutBtn.disabled =
                            false;


                        logoutBtn.innerHTML =
                            "<span>↪</span> Logout";


                        return;
                    }


                    // LOGIN PAGE

                    window.location.href =
                        "login.html";

                }
            );

        }



        // =====================================
        // NOTIFICATION
        // =====================================

        const notificationBtn =
            document.getElementById(
                "notificationBtn"
            );


        if (notificationBtn) {

            notificationBtn.addEventListener(
                "click",
                function () {

                    alert(
                        "You have 1 new notification."
                    );

                }
            );

        }


        console.log(
            "Dashboard loaded successfully."
        );

    }
);