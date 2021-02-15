<template>
  <div>
    <h2>Search Button</h2>

    <p>Full width:</p>
    <form class="example" action="/action_page.php">
      <input type="text" placeholder="Search.." name="search" />
      <button type="submit">
        <i class="fa fa-search"></i>
      </button>
    </form>

    <p>Centered inside a form with max-width:</p>
    <form class="example" action="/action_page.php" style="margin:auto;max-width:300px">
      <input type="text" placeholder="Search.." name="search2" />
      <button type="submit">
        <i class="fa fa-search"></i>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "searchBox",
};
</script>

<style scoped>
form.example input[type="text"] {
  padding: 10px;
  font-size: 17px;
  border: 1px solid grey;
  float: left;
  width: 80%;
  background: #f1f1f1;
}

form.example button {
  float: left;
  width: 20%;
  padding: 10px;
  background: #2196f3;
  color: white;
  font-size: 17px;
  border: 1px solid grey;
  border-left: none;
  cursor: pointer;
}

form.example button:hover {
  background: #0b7dda;
}

form.example::after {
  content: "";
  clear: both;
  display: table;
}
</style>