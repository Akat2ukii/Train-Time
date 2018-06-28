$( document ).ready(function() {

        
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBIcg-i7MilVWYlqyz0t9ZfuSlujSNvfSQ",
        authDomain: "hyun-project-756c7.firebaseapp.com",
        databaseURL: "https://hyun-project-756c7.firebaseio.com",
        projectId: "hyun-project-756c7",
        storageBucket: "hyun-project-756c7.appspot.com",
        messagingSenderId: "493764036544"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    //Create vars to hold submitted information to store into firebase

    var name = "";
    var destination = "";
    var time = 0;
    var frequency = 0;
    var arrival = 0;
    var CurrentTime = moment().format("HH:mm");
    var firstTime = 0;
    console.log(CurrentTime);
    
    
    
    //On button click, pull the values from the submission box and store into firebase as variables.
    $("#submit").on("click", function(event) {
        event.preventDefault();

        name = $("#Name").val().trim();
        destination = $("#Destination").val().trim();
        time = $("#Time").val().trim();
        frequency = $("#Frequency").val().trim();
        firstTime= moment($("#Time").val().trim(), "HH:mm").subtract(10, "years").format("X");
        console.log(firstTime);
        // Format entered time
        var Difference = moment().diff(moment.unix(firstTime), "minutes");
        var Remainder = moment().diff(moment.unix(firstTime), "minutes") % frequency ;
        var minutes = frequency - Remainder;
        var arrival = moment().add(minutes, "m").format("hh:mm A");
        console.log(minutes);
        console.log(arrival); 
        
        
        
    
        database.ref().set({
        name: name,
        destination: destination,
        time: time,
        frequency: frequency,
        minutes: minutes,
        arrival: arrival,
        });
    });

    database.ref().on("value", function(snapshot) {
        
        var newRow = "<tr><td>"+(snapshot.val().name)+"</td><td>"+(snapshot.val().destination)+"</td><td>"+(snapshot.val().frequency)+"</td><td>"+(snapshot.val().arrival)+"</td><td>"+(snapshot.val().minutes)+"</td></tr>"
        $("table tbody").append(newRow);

    });
    });