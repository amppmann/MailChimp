const mailchimp = require('@mailchimp/mailchimp_marketing');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

mailchimp.setConfig({


    apiKey: "cd8cb0acc0e4fcba863ba1c3a9eb2bef-us21",
    server: "us21"
});



app.post('/', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // SETTING THE LISTID-- - > AUDIENCE ID;
    const listId = "b93dfe9d09";


    const subscribingUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    }


    // UPLOADING THE USERDETAILS TO THE SERVER....

    async function run() {
        
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",

            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName,
            }
        });

        res.sendFile(__dirname + "/success.html");
    }


    run().catch((e) => {
        res.sendFile(__dirname + "/failure.html");
    });


});


app.post("/failure", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/success", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("Your server is running.....");
});