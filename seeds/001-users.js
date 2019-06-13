
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username:'dave', password:'pass'},
        {username:'jan', password:'*crun%ch2y0'},
        {username:'zach', password:'1234'}
      ]);
    });
};
