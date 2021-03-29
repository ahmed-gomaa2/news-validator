import axios from "axios";

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("url").value;

    if (validateURL(formText)) {
        console.log("::: Form Submitted :::");
        getTheData("https://rocky-hamlet-43473.herokuapp.com/validate", { url: formText }).then(
            (res) => {
                console.log(res);
                const results = document.getElementById("evaluation-result");
                for (const property in res) {
                    if (
                        property === "confidence" ||
                        property === "model" ||
                        property === "irony" ||
                        property === "subjectivity" ||
                        property === "score_tag" ||
                        property === "agreement"
                    ) {
                        const li = document.createElement("LI");
                        const text = document.createTextNode(`${property}: ` + res[property]);
                        li.appendChild(text);
                        results.appendChild(li);
                    } else {
                        console.log("fladkjflasjf");
                    }
                }
            }
        );
    } else {
        alert("Please Enter a valid URL!");
    }

    console.log("::: Form Submitted :::");
}

const getTheData = async (url = "", data = {}) => {
    //making the body
    const body = data;
    //making the post configurations
    const configurations = {
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
        mode: "cors",
        body: JSON.stringify(data),
    };

    //getting the response from the api
    try {
        const res = await axios.post(url, body, configurations);

        //returning the data to the client
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
window.handleSubmit = handleSubmit;

export { handleSubmit };
