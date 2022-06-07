const mongoose = require('mongoose');

const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: Date,
  date_of_death: Date,
});

AuthorSchema
  .virtual('name')
  .get(function() {
    if (!this.first_name || !this.family_name) return '';
    return this.family_name + ', ' + this.first_name;
  });

AuthorSchema
  .virtual('lifespan')
  .get(function() {
    let lifetimeString = '';
    if (this.date_of_birth) {
      lifetimeString = this.date_of_birth_formatted;
    }
    lifetimeString += ' - ';
    if (this.date_of_death) {
      lifetimeString += this.date_of_birth_formatted;
    }
    return lifetimeString;
  });

AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function() {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  });

AuthorSchema
  .virtual('date_of_death_formatted')
  .get(function() {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
  });

module.exports = mongoose.model('Author', AuthorSchema);
