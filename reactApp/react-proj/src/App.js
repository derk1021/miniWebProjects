function App() {
  const currDate = new Date();

  let message;
  if (
    "12:00:00 AM" <= currDate.toLocaleTimeString() &&
    currDate.toLocaleTimeString() < "12:00:00 PM"
  ) {
    message = "Good Morning";
  } else if (
    "12:00:00 PM" <= currDate.toLocaleTimeString() &&
    currDate.toLocaleTimeString() < "06:00:00 PM"
  ) {
    message = "Good Afternoon";
  } else if (
    "06:00:00 PM" <= currDate.toLocaleTimeString() &&
    currDate.toLocaleTimeString() < "12:00:00 AM"
  ) {
    message = "Good Evening";
  }
  console.log(message);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
