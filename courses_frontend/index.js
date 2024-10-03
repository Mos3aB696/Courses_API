fetch("http://localhost:2500/api/courses")
  .then((res) => res.json())
  .then((data) => console.log(data));
