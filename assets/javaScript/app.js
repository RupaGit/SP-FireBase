var config = {
    apiKey: "AIzaSyB8gWLfVxjV0Tins8q5W6UIzwXLzL3oH54",
    authDomain: "sp-intro-to-firebase.firebaseapp.com",
    databaseURL: "https://sp-intro-to-firebase.firebaseio.com",
    projectId: "sp-intro-to-firebase",
    storageBucket: "sp-intro-to-firebase.appspot.com",
    messagingSenderId: "794647386984",
    appId: "1:794647386984:web:83ae7051fcee1273df54dd"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#submitButton").on("click", function(event){
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var destination = $("#trainDest").val().trim();
    var frequency  = $("#trainFreq").val().trim();
    var firstTrain = $("#firtTrainTime").val();
    var currentMinutes = moment().format('mm'); 
    var nextTrainTimeHelper = currentMinutes % frequency;
    var minsToNextTrain = frequency - nextTrainTimeHelper;
    var nextTrainInMillis = moment().add(minsToNextTrain, 'minutes');
    var nextTrain = moment(nextTrainInMillis,"h:mm A").format("HH:mm");
    var newTrain = {
        tName: trainName,
        tDest: destination,
        tFreq: frequency,
        tFirstTrain: firstTrain,
        tnextTrain: nextTrain,
        tminsToNextTrain: minsToNextTrain
    };
    database.ref("/trainDetails").push(newTrain);
});

database.ref("/trainDetails").on("child_added", function(childSnapshot)  {
    var trainName = childSnapshot.val().tName;
    var destination = childSnapshot.val().tDest;
    var frequency = childSnapshot.val().tFreq;
    var firstTrain = childSnapshot.val().tFirstTrain;
    var nextTrain = childSnapshot.val().tnextTrain;
    var minsToNextTrain = childSnapshot.val().tminsToNextTrain;
    console.log(trainName);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);
    console.log(nextTrain);
    console.log(minsToNextTrain);
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minsToNextTrain)
      );
      $("#trainTable > tbody").append(newRow);
});