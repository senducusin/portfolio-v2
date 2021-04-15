(function () {

    window.addEventListener("load", function () {
        setupInputFieldEventListeners()
        setupSubmitEventListener()
    })

    function setupSubmitEventListener() {
        document.getElementById("submit").addEventListener("click", () => {
            shouldShowPreloader(true)

            let parameters = {}

            document.querySelectorAll('.input-field').forEach(inputContainer => {
                let id = inputContainer.children[0].id
                let value = inputContainer.children[0].value

                parameters[id] = value
            })

            sendEmail(parameters)
        })
    }

    function shouldShowPreloader(bool) {
        let preloader = document.getElementById("preloader")
        if (bool) {
            preloader.classList.remove("hidden")
        } else {
            if (!preloader.classList.contains("hidden")) {
                preloader.classList.add("hidden")
            }
        }

    }

    function clearInputFields() {
        document.querySelectorAll('.input-field').forEach(inputContainer => {
            inputContainer.children[0].value = ""
        })
    }

    function disableSendButton() {
        document.getElementById("submit").classList.add("disabled")
    }

    function sendEmail(parameters) {
        (async () => {
            const rawResponse = await fetch('/send', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });

            const response = await rawResponse.json();

            if (response) {
                if (response.status == "ok") {
                    clearInputFields()
                    disableSendButton()
                    M.toast({ html: 'Email Sent!' })
                } else {
                    M.toast({ html: 'An error has occured' })
                }
                shouldShowPreloader(false)
            }
        })()
    }

    function setupInputFieldEventListeners() {
        document.querySelectorAll('.input-field').forEach(inputField => {
            inputField.oninput = function () {
                let button = document.getElementById("submit")

                if (validateInputFields()) {
                    button.classList.remove("disabled")
                } else {
                    if (!button.classList.contains(`disabled`)) {
                        disableSendButton()
                    }
                }
            }
        })
    }

    function validateInputFields() {
        const inputContainers = document.querySelectorAll('.input-field')

        for (var index = 0; index < inputContainers.length; index++) {

            const value = inputContainers[index].children[0].value
            const id = inputContainers[index].children[0].id

            // Length checker
            if (value.length == 0) {
                return false
            }

            // Email format checker
            if (id == "email") {
                let test = value.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)
                if (test == null || test.length == 0) return false
            }
        }

        return true
    }

})();