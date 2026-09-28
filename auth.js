/* REGISTER */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("registerUsername").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        /* CHECK PASSWORD */

        if (password !== confirmPassword) {

            message.textContent = "Passwords do not match.";
            message.className = "error";

            return;
        }


        /* SAVE DEMO ACCOUNT */

        const account = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem(
            "gameMatchAccount",
            JSON.stringify(account)
        );


        message.textContent =
            "Registration successful! Redirecting to login...";

        message.className = "success";


        /* GO TO LOGIN */

        setTimeout(function() {

            window.location.href = "login.html";

        }, 1000);

    });

}


/* LOGIN */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        /* GET SAVED ACCOUNT */

        const savedAccount =
            localStorage.getItem("gameMatchAccount");


        if (!savedAccount) {

            message.textContent =
                "No account found. Please register first.";

            message.className = "error";

            return;
        }


        const account =
            JSON.parse(savedAccount);


        /* CHECK LOGIN */

        if (
            username === account.username &&
            password === account.password
        ) {

            localStorage.setItem(
                "gameMatchLoggedIn",
                "true"
            );

            localStorage.setItem(
                "gameMatchUsername",
                account.username
            );


            message.textContent =
                "Login successful! Opening website...";

            message.className = "success";


            /* GO TO MAIN WEBSITE */

            setTimeout(function() {

                window.location.href = "index.html";

            }, 800);


        } else {

            message.textContent =
                "Incorrect username or password.";

            message.className = "error";

        }

    });

}