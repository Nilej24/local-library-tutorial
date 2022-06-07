const mongoose = require('mongoose');

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
      lifetimeString = this.date_of_birth.getYear().toString();
    }
    lifetimeString += ' - ';
    if (this.date_of_death) {
      lifetimeString += this.date_of_birth.getYear().toString();
    }
    return lifetimeString;
  });

AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);